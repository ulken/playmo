import createDebug from "debug";
import { onEvent } from "./utils/dom";
import ElementObserver from "./element-observer";
import KeyboardShortcuts from "./keyboard-shortcuts";
import VideoController from "./video-controller";
import AutoPlayer from "./auto-player";

const debug = createDebug("playmo:main");

(async function main() {
  debug("extension loaded");

  const shortcutsByVideo = new WeakMap();
  const videoObserver = ElementObserver({ selector: "video" });
  const autoPlayer = AutoPlayer({ observer: videoObserver });

  const initializeVideo = (video) => {
    const controller = VideoController({ video });
    shortcutsByVideo.set(video, KeyboardShortcuts({ controller }));
    autoPlayer.track(video, { controller });
  };

  videoObserver.on("elementAdded", (video) => {
    debug("video added", video);

    initializeVideo(video);
  });

  videoObserver.on("elementVisible", async (video) => {
    debug("video visible", video);

    await videoLoaded(video);
    debug("video loaded", video);

    shortcutsByVideo.get(video).registerListeners();
  });

  videoObserver.on("elementInvisible", (video) => {
    debug("video invisible", video);
    shortcutsByVideo.get(video).unregisterListeners();
  });

  videoObserver.on("elementRemoved", (video) => {
    debug("video removed", video);

    autoPlayer.untrack(video);
    shortcutsByVideo.get(video)?.unregisterListeners();
    shortcutsByVideo.delete(video);
  });

  for (const video of document.querySelectorAll("video")) {
    debug("video found", video);

    initializeVideo(video);
    videoObserver.observe(video);
  }
})();

async function videoLoaded(video) {
  if (video.readyState === HTMLVideoElement.HAVE_METADATA) {
    return Promise.resolve();
  }

  await onEvent(video, "loadedmetadata");
}

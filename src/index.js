import createDebug from "debug";
import { onEvent } from "./utils/dom";
import ElementObserver from "./element-observer";
import KeyboardShortcuts from "./keyboard-shortcuts";
import VideoController from "./video-controller";
import AutoPlayer from "./auto-player";

const debug = createDebug("playmo:main");

(async function main() {
  debug("extension loaded");

  const keyboardShortcutsByElement = new WeakMap();
  const elementObserver = ElementObserver({ selector: "video" });
  const autoPlayer = AutoPlayer({ observer: elementObserver });

  const initializeElement = (element) => {
    const video = VideoController({ element });
    keyboardShortcutsByElement.set(element, KeyboardShortcuts({ video }));
    autoPlayer.track(element, { controller: video });
  };

  elementObserver.on("elementAdded", (element) => {
    debug("element added", element);

    initializeElement(element);
  });

  elementObserver.on("elementVisible", async (element) => {
    debug("element visible", element);

    await videoLoaded(element);
    debug("video loaded", element);

    keyboardShortcutsByElement.get(element).registerListeners();
  });

  elementObserver.on("elementInvisible", (element) => {
    debug("element invisible", element);
    keyboardShortcutsByElement.get(element).unregisterListeners();
  });

  elementObserver.on("elementRemoved", (element) => {
    debug("element removed", element);

    autoPlayer.untrack(element);
    keyboardShortcutsByElement.get(element)?.unregisterListeners();
    keyboardShortcutsByElement.delete(element);
  });

  for (const element of document.querySelectorAll("video")) {
    debug("element found", element);

    initializeElement(element);
    elementObserver.observe(element);
  }
})();

async function videoLoaded(video) {
  if (video.readyState === HTMLVideoElement.HAVE_METADATA) {
    return Promise.resolve();
  }

  await onEvent(video, "loadedmetadata");
}

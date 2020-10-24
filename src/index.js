import createDebug from "debug";
import ElementObserver from "./element-observer";
import KeyboardShortcuts from "./keyboard-shortcuts";
import { onEvent } from "./utils/dom";
import VideoController from "./video-controller";

const debug = createDebug("playmo:main");

(function main() {
  debug("extension loaded");

  const keyboardShortcutsByElement = new WeakMap();

  const elementObserver = ElementObserver({ selector: "video" });

  elementObserver.on("elementAdded", (element) => {
    debug("element added", element);
    keyboardShortcutsByElement.set(
      element,
      KeyboardShortcuts({ video: VideoController({ element }) })
    );
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

    keyboardShortcutsByElement.get(element)?.unregisterListeners();
    keyboardShortcutsByElement.delete(element);
  });
})();

async function videoLoaded(video) {
  if (video.readyState === HTMLVideoElement.HAVE_METADATA) {
    return Promise.resolve();
  }

  await onEvent(video, "loadedmetadata");
}

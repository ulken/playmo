import createDebug from "debug";
import KeyboardShortcuts from "./keyboard-shortcuts";
import { onElementRemove, onEvent, waitForElement } from "./utils/dom";
import getCurrentVendor from "./vendor/current";
import VideoController from "./video-controller";

const debug = createDebug("playmo:main");

(function main() {
  debug("extension loaded");

  loop();
})();

async function loop() {
  const { elementSelector } = getCurrentVendor();
  debug(`element selector: ${elementSelector}`);

  const element = await videoLoaded(elementSelector);
  debug("video element loaded");

  const video = VideoController({ element });
  const keyboardShortcuts = KeyboardShortcuts({ video });

  keyboardShortcuts.registerKeyListeners();

  // if video element is removed when e.g. loading next video,
  // clean up and start over again
  await onElementRemove(element);
  debug("video element removed");

  keyboardShortcuts.deregisterKeyListeners();
  video.destroy();
  loop();
}

async function videoLoaded(selector) {
  const video = await waitForElement(selector);

  if (video.readyState === HTMLVideoElement.HAVE_METADATA) {
    return video;
  }

  await onEvent(video, "loadedmetadata");
  return video;
}

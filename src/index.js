import VideoController from "./video";
import KeyboardShortcuts from "./keyboard-shortcuts";
import { onEvent, waitForElement, onElementRemove } from "./utils/dom";
import getCurrentVendor from "./vendor/current";

(function main() {
  loop();
})();

async function loop() {
  const { elementSelector, keysToRegister } = getCurrentVendor();
  const element = await videoLoaded(elementSelector);
  const video = VideoController({ element });
  const keyboardShortcuts = KeyboardShortcuts({ video, keysToRegister });

  keyboardShortcuts.registerKeyListeners();

  /* If video element is removed when loading next episode,
     clean up and start over again */
  await onElementRemove(element);
  keyboardShortcuts.deregisterKeyListeners();
  loop();
}

async function videoLoaded(selector) {
  const video = await waitForElement(selector);
  await onEvent(video, "loadedmetadata");
  return video;
}

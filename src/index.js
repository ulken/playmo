import VideoController from "./video";
import KeyboardShortcuts from "./keyboard-shortcuts";
import { onEvent, waitForElement } from "./utils/dom";
import getCurrentVendor from "./vendor/current";

(async function main() {
  const { elementSelector, keysToRegister } = getCurrentVendor();
  const element = await videoLoaded(elementSelector);
  const video = VideoController({ element });
  const keyboardShortcuts = KeyboardShortcuts({ video, keysToRegister });
  keyboardShortcuts.registerKeyListeners();
})();

async function videoLoaded(selector) {
  const video = await waitForElement(selector);
  await onEvent(video, "loadedmetadata");
  return video;
}

import throttle from "./utils/throttle";

// Prevent flooding (UI can't keep up anyway)
const SCRUB_THROTTLE_MS = 100;

export default function KeyboardShortcuts({ video, keysToRegister }) {
  const keyEventCodeToCommand = {
    keyup: {
      Space: onSpaceKeyUp
    },
    keydown: {
      ArrowLeft: throttle(onArrowLeftKeyDown, SCRUB_THROTTLE_MS),
      ArrowRight: throttle(onArrowRightKeyDown, SCRUB_THROTTLE_MS)
    }
  };

  return {
    registerKeyListeners
  };

  function registerKeyListeners() {
    Object.keys(keyEventCodeToCommand).forEach(eventName => {
      document.addEventListener(eventName, ({ code }) => {
        const codeToCommand = keyEventCodeToCommand[eventName];
        if (keysToRegister.includes(code) && code in codeToCommand) {
          event.preventDefault();
          codeToCommand[code](event);
        }
      });
    });
  }

  function onSpaceKeyUp() {
    video.togglePlayState();
  }

  function onArrowLeftKeyDown({ shiftKey }) {
    video.rewind({ fast: shiftKey });
  }

  function onArrowRightKeyDown({ shiftKey }) {
    video.fastForward({ fast: shiftKey });
  }
}

import createDebug from "debug";
import throttle from "./utils/throttle";
import KeyCodes from "./utils/key-codes";
import { prettifyKeyboardEvent } from "./utils/pretty-print";

const debug = createDebug("playmo:kbd");

// prevent flooding (UI can't keep up anyway)
const SCRUB_THROTTLE_MS = 100;

export default function KeyboardShortcuts({ video }) {
  const keyEventCodeToCommandHandler = {
    keydown: {
      ArrowLeft: throttle(onArrowLeftKeyDown, SCRUB_THROTTLE_MS),
      ArrowRight: throttle(onArrowRightKeyDown, SCRUB_THROTTLE_MS),
    },
    keyup: {
      Space: onSpaceKeyUp,
    },
  };

  const defaultState = Object.freeze({
    // needed to track whether event/command is already handled natively
    eventHandled: false,
  });

  const state = { ...defaultState };

  return {
    registerKeyListeners,
    deregisterKeyListeners,
  };

  function registerKeyListeners() {
    Object.keys(keyEventCodeToCommandHandler).forEach((eventName) => {
      document.addEventListener(eventName, onKeyEvent);
    });
    document.addEventListener("keydown", preventSpacebarFromSrollingPage);
    document.addEventListener("keyup", resetState);
  }

  function deregisterKeyListeners() {
    Object.keys(keyEventCodeToCommandHandler).forEach((eventName) => {
      document.removeEventListener(eventName, onKeyEvent);
    });
    document.removeEventListener("keydown", preventSpacebarFromSrollingPage);
    document.removeEventListener("keyup", resetState);
  }

  function preventSpacebarFromSrollingPage(event) {
    if (
      event.target.isSameNode(document.body) &&
      event.code === KeyCodes.Space
    ) {
      debug(
        prettifyKeyboardEvent(event, "preventing spacebar from scrolling page")
      );
      event.preventDefault();
    }
  }

  function resetState() {
    Object.entries(defaultState).forEach(([k, v]) => {
      state[k] = v;
    });
  }

  function onKeyEvent(event) {
    const { type, code } = event;
    debug(prettifyKeyboardEvent(event));

    if (video.hasStateChanged()) {
      state.eventHandled = true;
    }

    if (state.eventHandled) {
      debug(prettifyKeyboardEvent(event, "event already handled"));
      return;
    }

    const handleCommand = keyEventCodeToCommandHandler[type][code];
    if (handleCommand) {
      debug(prettifyKeyboardEvent(event, "handling event"));
      event.preventDefault();
      handleCommand(event);
    }
  }

  function onSpaceKeyUp() {
    const playing = video.isPlaying();
    debug(`toggling play state: ${playing} -> ${!playing}`);
    video.togglePlayState();
  }

  function onArrowLeftKeyDown({ shiftKey: fast }) {
    debug(`rewinding [fast=${fast}]`);
    video.rewind({ fast });
  }

  function onArrowRightKeyDown({ shiftKey: fast }) {
    debug(`fast forwarding [fast=${fast}]`);
    video.fastForward({ fast });
  }
}

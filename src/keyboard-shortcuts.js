import createDebug from "debug";
import EventEmitter from "mitt";
import throttle from "./utils/throttle";
import KeyCodes from "./utils/key-codes";
import { prettifyKeyboardEvent } from "./utils/pretty-print";

const debug = createDebug("playmo:kbd");

export default function KeyboardShortcuts({ controller }) {
  // prevent flooding (UI can't keep up anyway)
  const SCRUB_THROTTLE_MS = 100;

  const { on, off, emit } = EventEmitter();

  const keyEventCodeToCommandHandler = {
    // continuous, repetitive actions ("press and hold")
    keydown: {
      [KeyCodes.ArrowLeft]: throttle(onArrowLeftKeyDown, SCRUB_THROTTLE_MS),
      [KeyCodes.ArrowRight]: throttle(onArrowRightKeyDown, SCRUB_THROTTLE_MS),
      [KeyCodes.ArrowUp]: throttle(onArrowUpKeyDown, SCRUB_THROTTLE_MS),
      [KeyCodes.ArrowDown]: throttle(onArrowDownKeyDown, SCRUB_THROTTLE_MS),
    },
    // toggles
    keyup: {
      [KeyCodes.Space]: onSpaceKeyUp,
      [KeyCodes.MediaPlayPause]: onMediaPlayPauseKeyUp,
      [KeyCodes.Enter]: onEnterKeyUp,
      [KeyCodes.KeyM]: onMKeyUp,
      [KeyCodes.KeyF]: onFKeyUp,
      [KeyCodes.Escape]: onEscapeKeyUp,
    },
  };

  const defaultState = Object.freeze({
    // needed to track whether event/command is already handled natively
    eventHandled: false,
  });

  const state = { ...defaultState };

  return {
    on,
    off,
    registerListeners,
    unregisterListeners,
  };

  function registerListeners() {
    for (const eventName of Object.keys(keyEventCodeToCommandHandler)) {
      document.addEventListener(eventName, onKeyEvent);
    }
    document.addEventListener("keydown", preventSpacebarFromSrollingPage);
    document.addEventListener("keyup", resetState);

    controller.registerListeners();
  }

  function unregisterListeners() {
    for (const eventName of Object.keys(keyEventCodeToCommandHandler)) {
      document.removeEventListener(eventName, onKeyEvent);
    }
    document.removeEventListener("keydown", preventSpacebarFromSrollingPage);
    document.removeEventListener("keyup", resetState);

    controller.unregisterListeners();
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
    for (const [k, v] of Object.entries(defaultState)) {
      state[k] = v;
    }
  }

  function onKeyEvent(event) {
    const { type, code } = event;
    debug(prettifyKeyboardEvent(event));

    if (controller.hasStateChanged()) {
      // note: handled `keydown` event propagates to `keyup`
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
      emit("eventHandled", event);
    }
  }

  function togglePlayState() {
    const playing = controller.isPlaying();
    debug(`toggling play state: ${playing} -> ${!playing}`);
    controller.togglePlayState();
  }

  function onSpaceKeyUp() {
    togglePlayState();
  }

  function onMediaPlayPauseKeyUp() {
    togglePlayState();
  }

  function onEnterKeyUp({ altKey: shouldResetPlaybackRate }) {
    if (shouldResetPlaybackRate) {
      debug("resetting playback rate");
      controller.resetPlaybackRate();
    }
  }

  function onMKeyUp() {
    const muted = controller.isMuted();
    debug(`toggling muted state: ${muted} -> ${!muted}`);
    controller.toggleMute();
  }

  function onFKeyUp() {
    const transition = controller.isFullscreen()
      ? "fullscreen -> windowed"
      : "windowed -> fullscreen";
    debug(`toggling fullscreen state: ${transition}`);
    controller.toggleFullscreen();
  }

  function onEscapeKeyUp() {
    if (controller.isFullscreen()) {
      debug("exiting fullscreen mode");
      controller.exitFullscreen();
    }
  }

  function onArrowLeftKeyDown({
    altKey: decreasePlaybackRate,
    shiftKey: fast,
  }) {
    if (decreasePlaybackRate) {
      debug("decreasing playback rate");
      controller.decreasePlaybackRate();
    } else {
      debug(`rewinding [fast=${fast}]`);
      controller.rewind({ fast });
    }
  }

  function onArrowRightKeyDown({
    altKey: increasePlaybackRate,
    shiftKey: fast,
  }) {
    if (increasePlaybackRate) {
      debug("increasing playback rate");
      controller.increasePlaybackRate();
    } else {
      debug(`fast forwarding [fast=${fast}]`);
      controller.fastForward({ fast });
    }
  }

  function onArrowUpKeyDown() {
    debug("volume up");
    controller.volumeUp();
  }

  function onArrowDownKeyDown() {
    debug("volume down");
    controller.volumeDown();
  }
}

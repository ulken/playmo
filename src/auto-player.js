import createDebug from "debug";

const debug = createDebug("playmo:auto-player");

function AutoPlayer({ observer }) {
  const stateByElement = new WeakMap();

  observer.on("elementVisible", onElementVisible);
  observer.on("elementInvisible", onElementInvisible);

  return {
    track,
    untrack,
  };

  function track(element, { controller }) {
    debug("tracking element", element);
    stateByElement.set(element, { autoPaused: false, controller });
  }

  function untrack(element) {
    debug("untracking element", element);
    stateByElement.delete(element);
  }

  function onElementVisible(element) {
    const state = stateByElement.get(element);
    const { autoPaused, controller } = state;

    if (autoPaused && !controller.isPlaying()) {
      debug("auto-resuming video", element);
      controller.togglePlayState();
      stateByElement.set(element, { ...state, autoPaused: false });
    }
  }

  function onElementInvisible(element) {
    const state = stateByElement.get(element);
    const { controller } = state;
    if (controller.isPlaying()) {
      debug("auto-pausing video", element);
      controller.togglePlayState();
      stateByElement.set(element, { ...state, autoPaused: true });
    }
  }
}

export default AutoPlayer;

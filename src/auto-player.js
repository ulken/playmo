import createDebug from "debug";

const debug = createDebug("playmo:auto-player");

function AutoPlayer({ observer }) {
  const stateByVideo = new WeakMap();

  observer.on("elementVisible", onVideoVisible);
  observer.on("elementInvisible", onVideoInvisible);

  return {
    track,
    untrack,
  };

  function track(video, { controller }) {
    debug("tracking video", video);
    stateByVideo.set(video, { autoPaused: false, controller });
  }

  function untrack(video) {
    debug("untracking video", video);
    stateByVideo.delete(video);
  }

  function onVideoVisible(video) {
    const state = stateByVideo.get(video);
    const { autoPaused, controller } = state;

    if (autoPaused && !controller.isPlaying()) {
      debug("auto-resuming video", video);
      controller.togglePlayState();
      stateByVideo.set(video, { ...state, autoPaused: false });
    }
  }

  function onVideoInvisible(video) {
    const state = stateByVideo.get(video);
    const { controller } = state;
    if (controller.isPlaying()) {
      debug("auto-pausing video", video);
      controller.togglePlayState();
      stateByVideo.set(video, { ...state, autoPaused: true });
    }
  }
}

export default AutoPlayer;

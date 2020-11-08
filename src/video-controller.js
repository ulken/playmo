import throttle from "./utils/throttle";
import { ancestorOf } from "./utils/dom";

export default function VideoController({ video }) {
  if (!video || !video.tagName === "VIDEO") {
    throw new Error("video element required");
  }

  const ScrubSpeed = {
    Default: 10,
    Fast: 60,
  };

  const Volume = {
    Min: 0,
    Max: 1,
    Step: 0.1,
  };

  const PlaybackRate = {
    // rationale: https://stackoverflow.com/a/32320020
    Min: 0.0625,
    Max: 16,
    Step: 0.1,
    Default: 1,
  };

  const VideoState = {
    Properties: [
      "paused",
      "currentTime",
      "volume",
      "muted",
      "playbackRate",
      "fullscreen",
    ],
    // note: `volumehange` includes changes to both the `volume` and `muted` properties
    Events: ["play", "pause", "playing", "ended", "volumechange", "ratechange"],
  };

  const previousState = createSnapshot(VideoState.Properties);
  const updateStateThrottled = throttle(updateState, 100);

  return {
    isPlaying,
    isMuted,
    isFullscreen,
    togglePlayState: withStateUpdate(togglePlayState),
    fastForward: withStateUpdate(fastForward),
    rewind: withStateUpdate(rewind),
    volumeUp: withStateUpdate(volumeUp),
    volumeDown: withStateUpdate(volumeDown),
    toggleMute: withStateUpdate(toggleMute),
    increasePlaybackRate: withStateUpdate(increasePlaybackRate),
    decreasePlaybackRate: withStateUpdate(decreasePlaybackRate),
    resetPlaybackRate: withStateUpdate(resetPlaybackRate),
    toggleFullscreen: withStateUpdate(toggleFullscreen),
    exitFullscreen: withStateUpdate(exitFullscreen),
    hasStateChanged,
    registerListeners,
    unregisterListeners,
  };

  function withStateUpdate(action) {
    return (...parameters) => {
      action(...parameters);
      updateState();
    };
  }

  function registerListeners() {
    document.addEventListener("fullscreenchange", updateState);

    for (const eventName of VideoState.Events) {
      video.addEventListener(eventName, updateState);
    }

    // no need for more frequent updates
    video.addEventListener("timeupdate", updateStateThrottled);
  }

  function unregisterListeners() {
    document.removeEventListener("fullscreenchange", updateState);

    for (const eventName of VideoState.Events) {
      video.removeEventListener(eventName, updateState);
    }

    video.removeEventListener("timeupdate", updateStateThrottled);
  }

  function isPlaying() {
    return !video.paused;
  }

  function isMuted() {
    return video.muted;
  }

  function isFullscreen() {
    return (
      document.fullscreenElement !== null &&
      document.fullscreenElement.isSameNode(getFullscreenElement())
    );
  }

  function togglePlayState() {
    if (isPlaying()) {
      video.pause();
    } else {
      video.play();
    }
  }

  function fastForward({ fast }) {
    const newTime = getCurrentTime() + getDurationToScrub({ fast });
    setCurrentTime(newTime);
  }

  function rewind({ fast }) {
    const newTime = getCurrentTime() - getDurationToScrub({ fast });
    setCurrentTime(newTime);
  }

  function volumeUp() {
    const newVolume = Math.min(getVolume() + Volume.Step, Volume.Max);
    setVolume(newVolume);
  }

  function volumeDown() {
    const newVolume = Math.max(getVolume() - Volume.Step, Volume.Min);
    setVolume(newVolume);
  }

  function toggleMute() {
    video.muted = !video.muted;
  }

  function increasePlaybackRate() {
    const newPlaybackRate = Math.min(
      getPlaybackRate() + PlaybackRate.Step,
      PlaybackRate.Max
    );
    setPlaybackRate(newPlaybackRate);
  }

  function decreasePlaybackRate() {
    const newPlaybackRate = Math.max(
      getPlaybackRate() - PlaybackRate.Step,
      PlaybackRate.Min
    );
    setPlaybackRate(newPlaybackRate);
  }

  function resetPlaybackRate() {
    setPlaybackRate(PlaybackRate.Default);
  }

  function toggleFullscreen() {
    if (isFullscreen()) {
      exitFullscreen();
    } else {
      getFullscreenElement().requestFullscreen();
    }
  }

  function exitFullscreen() {
    document.exitFullscreen();
  }

  function getFullscreenElement() {
    // we're targeting an ancestor to have custom controls show in fullscreen mode.
    // going 3 generations back is a simple heuristic based on observations in the wild.
    // the most common cases seem to be 2-3 and using the latter to be one the safe side
    // doesn't seem to hurt.
    // note: done on-demand since video not always at its final location in the DOM at construction.
    return ancestorOf(video, { generationsBack: 3 });
  }

  function hasStateChanged() {
    return Object.entries(previousState).some(([property, oldValue]) => {
      const currentValue = getPropertyValue(video, property);
      if (property === "currentTime") {
        // any change less than a second is not practically relevant
        return Math.abs(currentValue - oldValue) > 1;
      }
      return currentValue !== oldValue;
    });
  }

  function cloneState(video, { properties }) {
    return Object.fromEntries(
      properties.map((p) => [p, getPropertyValue(video, p)])
    );
  }

  function updateState() {
    for (const property of VideoState.Properties) {
      previousState[property] = getPropertyValue(video, property);
    }
  }

  function getPropertyValue(video, property) {
    return property === "fullscreen" ? isFullscreen() : video[property];
  }

  function createSnapshot(properties) {
    return cloneState(video, { properties });
  }

  function getCurrentTime() {
    return video.currentTime;
  }

  function setCurrentTime(time) {
    video.currentTime = time;
  }

  function getDurationToScrub({ fast }) {
    return fast ? ScrubSpeed.Fast : ScrubSpeed.Default;
  }

  function getVolume() {
    return video.volume;
  }

  function setVolume(volume) {
    video.volume = volume;
  }

  function getPlaybackRate() {
    return video.playbackRate;
  }

  function setPlaybackRate(playbackRate) {
    video.playbackRate = playbackRate;
  }
}

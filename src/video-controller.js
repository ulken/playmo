import throttle from "./utils/throttle";

export default function VideoController({ element }) {
  if (!element || !element.tagName === "VIDEO") {
    throw new Error("video element required");
  }

  const TIME_THROTTLE_MS = 100;

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

  const ELEMENT_STATE_PROPERTIES = [
    "paused,",
    "currentTime",
    "volume",
    "muted",
    "playbackRate",
    "fullscreen",
  ];

  const previousState = createSnapshot(ELEMENT_STATE_PROPERTIES);

  // note: `volumehange` includes changes to both the `volume` and `muted` properties
  ["play", "pause", "playing", "ended", "volumechange", "ratechange"].forEach(
    (eventName) => {
      element.addEventListener(eventName, updateState);
    }
  );

  // no need for more frequent updates
  element.addEventListener(
    "timeupdate",
    throttle(updateState, TIME_THROTTLE_MS)
  );

  document.addEventListener("fullscreenchange", updateState);

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
    destroy,
  };

  function withStateUpdate(action) {
    return (...parameters) => {
      action(...parameters);
      updateState();
    };
  }

  function destroy() {
    document.removeEventListener("fullscreenchange", updateState);
  }

  function isPlaying() {
    return !element.paused;
  }

  function isMuted() {
    return element.muted;
  }

  function isFullscreen() {
    return (
      document.fullscreenElement !== null &&
      document.fullscreenElement.isSameNode(element)
    );
  }

  function togglePlayState() {
    if (isPlaying()) {
      element.pause();
    } else {
      element.play();
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
    element.muted = !element.muted;
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
      element.requestFullscreen();
    }
  }

  function exitFullscreen() {
    document.exitFullscreen();
  }

  function hasStateChanged() {
    return Object.entries(previousState).some(([property, oldValue]) => {
      const currentValue = getPropertyValue(element, property);
      if (property === "currentTime") {
        // any change less than a second is not practically relevant
        return Math.abs(currentValue - oldValue) > 1;
      }
      return currentValue !== oldValue;
    });
  }

  function cloneState(element, { properties }) {
    return Object.fromEntries(
      properties.map((p) => [p, getPropertyValue(element, p)])
    );
  }

  function updateState() {
    ELEMENT_STATE_PROPERTIES.forEach((property) => {
      previousState[property] = getPropertyValue(element, property);
    });
  }

  function getPropertyValue(element, property) {
    return property === "fullscreen" ? isFullscreen() : element[property];
  }

  function createSnapshot(properties) {
    return cloneState(element, { properties });
  }

  function getCurrentTime() {
    return element.currentTime;
  }

  function setCurrentTime(time) {
    element.currentTime = time;
  }

  function getDurationToScrub({ fast }) {
    return fast ? ScrubSpeed.Fast : ScrubSpeed.Default;
  }

  function getVolume() {
    return element.volume;
  }

  function setVolume(volume) {
    element.volume = volume;
  }

  function getPlaybackRate() {
    return element.playbackRate;
  }

  function setPlaybackRate(playbackRate) {
    element.playbackRate = playbackRate;
  }
}

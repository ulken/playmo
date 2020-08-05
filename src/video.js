import throttle from "./utils/throttle";

export default function Video({ element }) {
  if (!element || !element.tagName === "VIDEO") {
    throw new Error("video element required");
  }

  const ScrubSpeed = {
    Default: 10,
    Fast: 60,
  };

  const previousState = cloneState(element, {
    properties: ["paused", "currentTime"],
  });

  ["play", "pause", "playing", "ended"].forEach((eventName) => {
    element.addEventListener(eventName, updateState);
  });

  // no need for more frequent updates
  element.addEventListener("timeupdate", throttle(updateState, 200));

  return {
    isPlaying,
    togglePlayState: withStateUpdate(togglePlayState),
    fastForward: withStateUpdate(fastForward),
    rewind: withStateUpdate(rewind),
    hasStateChanged,
  };

  function withStateUpdate(action) {
    return (...parameters) => {
      action(...parameters);
      updateState();
    };
  }

  function isPlaying() {
    return !element.paused;
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

  function hasStateChanged() {
    return Object.entries(previousState).some(([property, oldValue]) => {
      const currentValue = element[property];
      if (property === "currentTime") {
        // any change less than a second is not practically relevant
        return Math.abs(currentValue - oldValue) > 1;
      }
      return currentValue !== oldValue;
    });
  }

  function cloneState(element, { properties }) {
    return Object.fromEntries(properties.map((p) => [p, element[p]]));
  }

  function updateState() {
    Object.keys(previousState).forEach((key) => {
      previousState[key] = element[key];
    });
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
}

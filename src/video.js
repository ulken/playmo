export default function Video({ element }) {
  if (!element || !element.tagName === "VIDEO") {
    throw new Error("video element required");
  }

  const DEFAULT_SCRUB_SECONDS = 10;
  const FAST_SCRUB_SECONDS = 60;

  return {
    togglePlayState,
    fastForward,
    rewind
  };

  function togglePlayState() {
    if (element.paused) {
      element.play();
    } else {
      element.pause();
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

  function getCurrentTime() {
    return element.currentTime;
  }

  function setCurrentTime(time) {
    element.currentTime = time;
  }

  function getDurationToScrub({ fast }) {
    return fast ? FAST_SCRUB_SECONDS : DEFAULT_SCRUB_SECONDS;
  }
}

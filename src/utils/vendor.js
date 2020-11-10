import createDebug from "debug";

const debug = createDebug("playmo:vendor");

function useVideoJs(video) {
  return getVideoJsPlayer(video) !== null;
}

function getVideoJsPlayer(video) {
  if ("videojs" in window) {
    return (
      Object.values(window.videojs.players).find((player) =>
        player.el().firstElementChild.isSameNode(video)
      ) ?? null
    );
  }

  return null;
}

function syncVideoJsFullscreenState(video, { fullscreen }) {
  if (!useVideoJs(video)) {
    debug("not using video.js", video);
    return;
  }

  const videoJsPlayer = getVideoJsPlayer(video);
  if (videoJsPlayer.isFullscreen() !== fullscreen) {
    const transition = videoJsPlayer.isFullscreen()
      ? "fullscreen -> windowed"
      : "windowed -> fullscreen";
    debug(`syncing video.js fullscreen state: ${transition}`);
    videoJsPlayer.isFullscreen(fullscreen);
    videoJsPlayer.toggleClass("vjs-fullscreen", fullscreen);
  }
}
export { useVideoJs, getVideoJsPlayer, syncVideoJsFullscreenState };

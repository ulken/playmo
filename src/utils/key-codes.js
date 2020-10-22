export default Object.freeze(
  Object.fromEntries(
    [
      "Space",
      "MediaPlayPause",
      "Enter",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "KeyM",
      "KeyF",
      "Escape"
    ].map((k) => [k, k])
  )
);

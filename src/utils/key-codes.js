export default Object.freeze(
  Object.fromEntries(
    [
      "Space",
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

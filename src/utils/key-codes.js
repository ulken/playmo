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
    ].map((k) => [k, k])
  )
);

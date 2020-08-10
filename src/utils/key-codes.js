export default Object.freeze(
  Object.fromEntries(
    [
      "Space",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "KeyM",
    ].map((k) => [k, k])
  )
);

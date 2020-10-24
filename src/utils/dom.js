function onEvent(element, eventName) {
  return new Promise((resolve) => {
    element.addEventListener(eventName, resolve);
  });
}

export { onEvent };
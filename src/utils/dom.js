function onEvent(element, eventName) {
  return new Promise((resolve) => {
    element.addEventListener(eventName, resolve);
  });
}

function ancestorOf(element, { generationsBack = 1 } = {}) {
  let ancestor = element.parentNode;
  for (let i = 1; i <= generationsBack; i++) {
    ancestor = ancestor.parentNode;
  }
  return ancestor;
}

export { onEvent, ancestorOf };

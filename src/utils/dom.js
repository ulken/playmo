export { onEvent, waitForElement, onElementRemove };

function onEvent(element, eventName) {
  return new Promise((resolve) => {
    element.addEventListener(eventName, resolve);
  });
}

function waitForElement(selector) {
  return new Promise((resolve) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const nodes = Array.from(mutation.addedNodes);
        for (const node of nodes) {
          if (node.matches && node.matches(selector)) {
            observer.disconnect();
            resolve(node);
          }
        }
      });
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  });
}

function onElementRemove(element) {
  return new Promise((resolve) => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        const nodes = Array.from(mutation.removedNodes);
        for (const node of nodes) {
          if (node.contains(element)) {
            observer.disconnect();
            resolve();
          }
        }
      });
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  });
}

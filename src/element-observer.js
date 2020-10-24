import EventEmitter from "mitt";

function ElementObserver({ selector }) {
  const { on, emit } = EventEmitter();

  const intersectionObserver = new IntersectionObserver((entries) => {
    for (const { intersectionRatio, target: element } of entries) {
      if (intersectionRatio > 0) {
        emit("elementVisible", element);
      } else {
        emit("elementInvisible", element);
      }
    }
  });

  const mutationObserver = new MutationObserver((mutations) => {
    for (const { addedNodes, removedNodes } of mutations) {
      for (const element of Array.from(addedNodes)) {
        if (element.matches && element.matches(selector)) {
          emit("elementAdded", element);
          intersectionObserver.observe(element);
        }
      }

      for (const element of Array.from(removedNodes)) {
        if (element.matches && element.matches(selector)) {
          emit("elementRemoved", element);
          intersectionObserver.unobserve(element);
        }
      }
    }
  });
  mutationObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  return {
    on,
  };
}

export default ElementObserver;

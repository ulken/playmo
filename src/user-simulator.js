import createDebug from "debug";
import { randomNumber } from "./utils/random";

const debug = createDebug("playmo:user-sim");

function UserSimulator() {
  const boxCache = new WeakMap();

  return {
    interactWith,
  };

  function interactWith(element) {
    const box = getBoxModel(element);

    // two events needed for user to be considered active in some players
    for (const event of [
      createRandomMouseMoveEvent(box),
      createRandomMouseMoveEvent(box),
    ]) {
      debug("simulating user interaction", event, element);
      element.dispatchEvent(event);
    }
  }

  function getBoxModel(element) {
    const cached = boxCache.get(element);
    if (cached) {
      return cached;
    }

    const box = element.getBoundingClientRect();
    boxCache.set(element, box);
    return box;
  }

  function createRandomMouseMoveEvent({ left, right, top, bottom }) {
    const x = randomNumber({ min: left, max: right });
    const y = randomNumber({ min: top, max: bottom });

    return new MouseEvent("mousemove", {
      view: window,
      bubbles: true,
      cancelable: false,
      pageX: x,
      pageY: y,
      clientX: x,
      clientY: y,
      screenX: x,
      screenY: y,
    });
  }
}

export default UserSimulator;

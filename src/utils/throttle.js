export default function throttle(task, delay) {
  let timeoutId = null;
  return (...parameters) => {
    if (timeoutId) {
      return;
    }

    task.apply(this, parameters);
    timeoutId = setTimeout(() => {
      timeoutId = null;
    }, delay);
  };
}

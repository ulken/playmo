export default function throttle(f, wait) {
  let timeoutId = null;
  return (...args) => {
    if (timeoutId) return;

    f.apply(this, args);
    timeoutId = setTimeout(() => {
      timeoutId = null;
    }, wait);
  };
}

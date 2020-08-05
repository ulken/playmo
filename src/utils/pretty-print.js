export { debugKeyboardEvent, glyphifyKeyCode, humanizeKeyEventType };

function debugKeyboardEvent({ type, code }, message = "") {
  const prefixedMessage = message ? `: ${message}` : message;
  debug(
    `❲ ${glyphifyKeyCode(code)} ❳ ${humanizeKeyEventType(
      type
    )}${prefixedMessage}`
  );
}

function glyphifyKeyCode(code) {
  return (
    {
      Space: "␣",
      ArrowLeft: "◀",
      ArrowRight: "▶",
    }[code] || code
  );
}

function humanizeKeyEventType(type) {
  return { keyup: "released", keydown: "pressed down" }[type] || type;
}

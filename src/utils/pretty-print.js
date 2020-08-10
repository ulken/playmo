export { prettifyKeyboardEvent, glyphifyKeyCode, humanizeKeyEventType };

function prettifyKeyboardEvent({ type, code }, message = "") {
  const prefixedMessage = message ? `: ${message}` : message;
  return `❲ ${glyphifyKeyCode(code)} ❳ ${humanizeKeyEventType(
    type
  )}${prefixedMessage}`;
}

function glyphifyKeyCode(code) {
  return (
    {
      Space: "␣",
      ArrowLeft: "◀️",
      ArrowRight: "▶️",
      ArrowUp: "🔼",
      ArrowDown: "🔽",
    }[code] || code
  );
}

function humanizeKeyEventType(type) {
  return { keyup: "released", keydown: "pressed down" }[type] || type;
}

export {
  prettifyKeyboardEvent,
  glyphifyKeyCode,
  humanizeKeyEventType,
  keyify,
  isModifierKey,
  isModifierPressed,
  stringifyModifiers,
};

function prettifyKeyboardEvent(event, message = "") {
  const { type, code } = event;
  const prefixedMessage = message ? `: ${message}` : message;
  const glyph =
    isModifierKey(code) && isModifierPressed(event, code)
      ? ""
      : glyphifyKeyCode(code);
  const modifiers = stringifyModifiers(event);
  const prefixedModifiers = glyph && modifiers ? `${modifiers} + ` : modifiers;

  return `${prefixedModifiers}${glyph} ${humanizeKeyEventType(
    type
  )}${prefixedMessage}`;
}

function isModifierKey(keyCode) {
  return ["control", "alt", "shift", "meta"].some((m) =>
    keyCode.toLowerCase().startsWith(m)
  );
}

function isModifierPressed(event, keyCode) {
  const modifier = convertModifierKeyCodeToPressedProperty(keyCode);
  return event[modifier] === true;
}

function stringifyModifiers({
  ctrlKey: ControlLeft,
  altKey: AltLeft,
  shiftKey: ShiftLeft,
  metaKey: MetaLeft,
}) {
  return Object.entries({ ControlLeft, AltLeft, ShiftLeft, MetaLeft })
    .filter(([k, v]) => v)
    .map(([k, v]) => glyphifyKeyCode(k))
    .join(" + ");
}

function keyify(key) {
  return `❲ ${key} ❳`;
}

function glyphifyKeyCode(code) {
  return keyify(
    {
      Space: "␣",
      ArrowLeft: "◀️",
      ArrowRight: "▶️",
      ArrowUp: "🔼",
      ArrowDown: "🔽",
      ControlLeft: "ctrl",
      ShiftLeft: "⇧",
      MetaLeft: "⌘",
      AltLeft: "⌥",
      Escape: "⎋",
    }[code] || code
  );
}

function humanizeKeyEventType(type) {
  return { keyup: "released", keydown: "pressed down" }[type] || type;
}

function convertModifierKeyCodeToPressedProperty(keyCode) {
  const toCamelCase = (text) => `${text[0].toLowerCase()}${text.substring(1)}`;
  const modifier = keyCode.replace("Left", "Key").replace("Control", "Ctrl");
  return toCamelCase(modifier);
}

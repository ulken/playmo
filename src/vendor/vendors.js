export default [
  {
    elementSelector: "video[id^=vjs_video]",
    keysToRegister: ["Space", "ArrowLeft", "ArrowRight"],
    matchURL: url => /^.*\.hbonordic\.com$/.test(url.hostname)
  },
  {
    elementSelector: "video#player",
    keysToRegister: ["Space", "ArrowLeft", "ArrowRight"],
    matchURL: url => /^.*\.dplay\..*$/.test(url.hostname)
  }
];

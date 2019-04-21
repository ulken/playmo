export default [
  {
    elementSelector: "video[id^=vjs_video]",
    keysToRegister: ["Space", "ArrowLeft", "ArrowRight"],
    matchURL: url => /^.*\.hbonordic\.com$/.test(url.hostname)
  },
  {
    elementSelector: "video#player",
    elementSelector: "#player",
    keysToRegister: ["ArrowLeft", "ArrowRight"],
    matchURL: url => /^.*\.dplay\..*$/.test(url.hostname)
  }
];

export default [
  {
    elementSelector: "#vjs_video_1_Clpp_html5_mse_api",
    keysToRegister: ["Space", "ArrowLeft", "ArrowRight"],
    matchURL: url => /^.*\.hbonordic\.com$/.test(url.hostname)
  },
  {
    elementSelector: "#player",
    keysToRegister: ["ArrowLeft", "ArrowRight"],
    matchURL: url => /^.*\.dplay\..*$/.test(url.hostname)
  }
];

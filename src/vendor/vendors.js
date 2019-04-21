export default [
  {
    elementSelector: "video[id$=Clpp_html5_mse_api]",
    keysToRegister: ["Space", "ArrowLeft", "ArrowRight"],
    matchURL: url => /^.*\.hbonordic\.com$/.test(url.hostname)
  },
  {
    elementSelector: "video#player",
    keysToRegister: ["Space", "ArrowLeft", "ArrowRight"],
    matchURL: url => /^.*\.dplay\..*$/.test(url.hostname)
  }
];

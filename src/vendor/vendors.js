export default [
  {
    elementSelector: "video[id$=Clpp_html5_mse_api]",
    matchURL: (url) => /^.*\.hbonordic\.com$/.test(url.hostname),
  },
  {
    elementSelector: "video#player",
    matchURL: (url) => /^.*\.dplay\..*$/.test(url.hostname),
  },
];

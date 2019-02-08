import vendors from "./vendors";

export default function getCurrentVendor() {
  return vendors.find(v => v.matchURL(window.location));
}

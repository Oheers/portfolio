import { MainRenderer } from "./renderers/mainRenderer.js";

document.addEventListener("DOMContentLoaded", () => {
  const renderer = new MainRenderer();
  renderer.start_rendering();
});

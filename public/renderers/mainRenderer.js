import { SpriteRenderer } from "./spriteRenderer.js";
export class MainRenderer {

  /**
   * Builds the renderer class, creating an accessible instance of the canvas and declaring a sprite renderer.
   * @param frame_rate The number of times to refresh the canvas with updated game content.
   */
  constructor(frame_rate) {
    this.MAX_FRAME_RATE = frame_rate;
    this.canvas = document.getElementById("canvas");
    this.sprite_renderer = new SpriteRenderer("character_sprites", this.canvas);
  }

  /**
   * Clears the canvas and re-draws an updated version of the screen.
   */
  update_canvas_viewport() {
    this.clear_canvas();
    this.sprite_renderer.drawSprite();
  }

  /**
   * Covers the canvas in a big clear rectangle to reset it for the next frame. Called automatically by the
   * update_canvas_viewport() function.
   */
  clear_canvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Begins the rendering job by declaring the context, calling the resolution rescaling methods and the
   * interval task that will repeat the render task each frame.
   */
  start_rendering() {
    this.context = this.canvas.getContext("2d");
    this.context.imageSmoothingEnabled = false;
    this.context.imageSmoothingQuality = "low";
    this.initiate_resolution();
    setInterval(
      this.update_canvas_viewport.bind(this),
      1000 / this.MAX_FRAME_RATE,
    );
  }

  /**
   * Sets the initial canvas resolution and attaches an event listener to rescale the window on resize.
   */
  initiate_resolution() {
    this.adjust_canvas_resolution()
    window.addEventListener('resize', this.adjust_canvas_resolution);
  }

  /**
   * Resizes the canvas to match the window dimensions without making the pixel art blurry.
   * - Retrieves the existing image data before resizing to keep the current content.
   * - Adjusts the canvas size based on the device's pixel ratio for high-resolution displays.
   * - Updates the canvas CSS styles to match the new dimensions.
   * - Disables image smoothing to keep pixel art crisp.
   * - Restores the previous image data after resizing.
   */
  adjust_canvas_resolution() {
    const scale_factor = window.devicePixelRatio || 1;
    const old_width = this.canvas.width;
    const old_height = this.canvas.height;
    const old_image = this.context.getImageData(0, 0, old_width, old_height);

    this.canvas.width = window.innerWidth * scale_factor;
    this.canvas.height = window.innerHeight * scale_factor;
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;

    this.context.imageSmoothingEnabled = false;
    this.context.scale(scale_factor, scale_factor);

    this.context.putImageData(old_image, 0, 0);
  }
}

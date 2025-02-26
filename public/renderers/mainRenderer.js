export class MainRenderer {
  constructor() {
    this.MAX_FRAME_RATE = 60;
    this.canvas = document.getElementById("canvas");
  }

  update_canvas_viewport() {
    this.clear_canvas();
  }

  clear_canvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  start_rendering() {
    this.context = this.canvas.getContext("2d");
    this.context.imageSmoothingEnabled = false;
    this.context.imageSmoothingQuality = "low";
    setInterval(
      this.update_canvas_viewport.bind(this),
      1000 / this.MAX_FRAME_RATE,
    );
  }
}

export class SpriteRenderer {
  /**
   * Handles all rendering of sprites that rely on a sprite sheet to draw on to the canvas.
   *
   * @param sprite_file_id The id of the sprite sheet <img> element in the HTML file.
   * @param canvas The HTML canvas element to draw the sprite onto.
   */
  constructor(sprite_file_id, canvas) {
    this.sprite_file = document.getElementById(sprite_file_id);
    this.canvas = canvas;
  }

  /**
   * Draws a sprite onto the canvas, the canvas must have imageSmoothingEnabled set to false and imageSmoothingQuality
   * set to low for the pixel art to appear properly.
   */
  drawSprite() {
    const ctx = this.canvas.getContext("2d");
    ctx.drawImage(
      this.sprite_file,
      288,
      39,
      16,
      25,
      window.innerWidth / 2,
      window.innerHeight / 2,
      48,
      75,
    );
  }
}

export class SpriteRenderer {
  /**
   * Handles all rendering of sprites that rely on a sprite sheet to draw on to the canvas.
   *
   * @param sprite_file_id The id of the sprite sheet <img> element in the HTML file.
   */
  constructor(sprite_file_id) {
    this._sprite_file = document.getElementById(sprite_file_id);
    this.sprites = [];
  }

  /**
   * Draws a sprite onto the canvas, the canvas must have imageSmoothingEnabled set to false and imageSmoothingQuality
   * set to low for the pixel art to appear properly.
   */
  draw_sprite() {
    this.sprites.forEach((sprite) => {
      sprite.draw();
    });
  }

  /**
   * Adds a sprite to the collection of sprites to be rendered with each frame draw.
   *
   * @param sprite The instance of a Sprite object.
   */
  add_sprite(sprite) {
    this.sprites.push(sprite);
  }

  /**
   * @returns {HTMLElement} An instance of the <img> element in HTML storing the sprite sheet.
   */
  get sprite_file() {
    return this._sprite_file;
  }
}

export class Sprite {
  /**
   * Represents a single instance of a sprite in the world, it can store multiple frames and have different animation
   * states added.
   *
   * @param sprite_file The <img> element in HTML storing the sprite sheet.
   * @param canvas The HTML canvas to draw the sprite onto.
   * @param sx The x coordinates on the sprite sheet to start sampling the sprite from.
   * @param sy The y coordinates on the sprite sheet to start sampling the sprite from.
   * @param wx The width of the sprite.
   * @param wy The height of the sprite.
   * @param scale_factor The scale factor from the sprite sheet to the canvas.
   */
  constructor(sprite_file, canvas, sx, sy, wx, wy, scale_factor) {
    this.sprite_file = sprite_file;
    this.canvas = canvas;
    this.animations = {};
    this.current_animation = undefined;
    this.current_frame = 0;
    this.last_frame_change = Date.now();
    this.sx = sx;
    this.sy = sy;
    this.wx = wx;
    this.wy = wy;
    this.scale_factor = scale_factor;
  }

  /**
   * Adds an animation to the sprite that automatically plays as it's rendered out. Each frame must be side by side to
   * the starting frame from left -> right.
   *
   * @param id The animation id, used in the set_animation() method.
   * @param frames The amount of frames in the animation.
   * @param sx The top left x coordinate of the first frame.
   * @param sy The top left y coordinate of the first frame.
   * @param speed The speed (seconds) per frame.
   */
  add_animation(id, frames, sx, sy, speed) {
    this.animations[id] = { speed: speed, frames: frames, sx: sx, sy: sy };
  }

  /**
   * Changes the animation the sprite currently follows, the animation must be previously added by the add_animation()
   * method.
   *
   * @param id The id of the animation to switch to.
   */
  set_animation(id) {
    this.current_animation = this.animations[id];
  }

  /**
   * Checks if the time passed since the last frame is enough to warrant moving onto the next frame and if so, moves
   * this.current_frame on.
   *
   * @param max_time The time between each frame in seconds.
   * @param max_frame The amount of frames available for the given animation.
   */
  check_new_frame(max_time, max_frame) {
    if (Date.now() - this.last_frame_change > max_time * 1000) {
      this.last_frame_change = Date.now();
      this.current_frame = (this.current_frame + 1) % max_frame;
    }
  }

  /**
   * - Draws the sprite onto the canvas.
   * - Checks for any frame changes and if so applies them to the newly drawn sprite.
   */
  draw() {
    const ctx = this.canvas.getContext("2d");
    let dx = 0;
    let dy = 0;
    if (this.current_animation !== undefined) {
      this.check_new_frame(
        this.current_animation.speed,
        this.current_animation.frames,
      );
      dx = this.current_animation.sx - this.sx;
      dy = this.current_animation.sy - this.sy;
    }
    ctx.drawImage(
      this.sprite_file,
      this.sx + dx + this.current_frame * this.wx,
      this.sy + dy,
      this.wx,
      this.wy,
      window.innerWidth / 2,
      window.innerHeight / 2,
      this.wx * this.scale_factor,
      this.wy * this.scale_factor,
    );
  }
}

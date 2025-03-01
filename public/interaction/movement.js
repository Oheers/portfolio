export class MovementEventHandler {
  /**
   * Handles all movement for the player, and accesses the client's world to make changes to the player location based
   * on their input.
   *
   * @param world {World} An instance of the client's world.
   * @param sprite {Sprite} An instance of the player's sprite to be animated.
   */
  constructor(world, sprite) {
    this.world = world;
    this.sprite = sprite;
    this.keys = {};
    this.init();

    this.movingKeys = ["KeyW", "KeyA", "KeyS", "KeyD"];
  }

  /**
   * Sets up the event listeners to detect player keyboard input.
   */
  init() {
    window.addEventListener("keydown", (e) => (this.keys[e.code] = true));
    window.addEventListener("keyup", (e) => {
      this.keys[e.code] = false;
      this.check_all_movement();
    });
  }

  /**
   * Checks if a given key is currently active or not. is_key_pressed("w") would check if the player is currently
   * pressing the W key or not.
   *
   * @param key The string representation of the key being checked. The capital form of a letter checks if shift is also
   * pressed.
   * @returns {boolean} True if the key is pressed, false if not.
   */
  is_key_pressed(key) {
    return this.keys[key] || false;
  }

  /**
   * Checks for all keys pressed (W, A, S, D), if none are pressed then this will cause the sprite to be put back into
   * its idle animation.
   */
  check_all_movement() {
    if (!this.movingKeys.some((key) => this.keys[key])) {
      this.sprite.set_animation("idle");
    }
  }

  /**
   * Applies the animations to the main character sprite depending on the direction they're moving.
   *
   * @param dx The player's inputted change in x.
   * @param dy The player's inputted change in y.
   */
  handle_animation(dx, dy) {
    if (dx || dy) {
      // Generates either "n/e/s/w" for the direction the player is moving in.
      const direction = dy < 0 ? "s" : dy > 0 ? "n" : dx > 0 ? "e" : "w";
      this.sprite.set_animation(`walk_${direction}`);
    }
  }

  /**
   * Checks all WASD keys for input movement and applies it to the world, also checking if the ShiftLeft key has been
   * pressed to let the user sprint.
   */
  action_pressed_keys() {
    const move_speed = this.is_key_pressed("ShiftLeft") ? 1.5 : 1;
    const dx =
      (this.is_key_pressed("KeyD") - this.is_key_pressed("KeyA")) * move_speed;
    const dy =
      (this.is_key_pressed("KeyW") - this.is_key_pressed("KeyS")) * move_speed;

    this.handle_animation(dx, dy);

    if (dx || dy) this.world.transform_world(dx, dy);
  }
}

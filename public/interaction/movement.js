export class MovementEventHandler {
  /**
   * Handles all movement for the player, and accesses the client's world to make changes to the player location based
   * on their input.
   *
   * @param world An instance of the client's world.
   */
  constructor(world) {
    this.world = world;
    this.keys = {};
    this.init();
  }

  /**
   * Sets up the event listeners to detect player keyboard input.
   */
  init() {
    window.addEventListener("keydown", (e) => (this.keys[e.key] = true));
    window.addEventListener("keyup", (e) => (this.keys[e.key] = false));
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
   * Checks all WASD keys for input movement and applies it to the world.
   */
  action_pressed_keys() {
    if (this.is_key_pressed("w")) {
      this.world.transform_world(0, 1);
    } else if (this.is_key_pressed("s")) {
      this.world.transform_world(0, -1);
    }

    if (this.is_key_pressed("a")) {
      this.world.transform_world(-1, 0);
    } else if (this.is_key_pressed("d")) {
      this.world.transform_world(1, 0);
    }
  }
}

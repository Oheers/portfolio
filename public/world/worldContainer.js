export class World {

  /**
   * A world represents all the persistent elements in the world (elements that will be in the
   * world with no player activity - so players and particles would be excluded from this.)
   *
   * @param context The HTML canvas context.
   * @param player_x The x position of the player.
   * @param player_y The y position of the player
   */
  constructor(context, player_x, player_y) {
    this.context = context;
    this.contents = []
    this.player_x = player_x;
    this.player_y = player_y;
  }

  /**
   * Adds an item to the data about the world.
   *
   * @param position_x The global x position of the item
   * @param position_y The global y position of the item
   */
  add_item(position_x, position_y) {
    this.contents.push(new Item(position_x, position_y));
  }

  /**
   * Loops through all items in the content of the world, and calls the draw() function which draws
   * the element relative to the player's position.
   */
  draw_all_items() {
    this.contents.forEach(item => {
      item.draw(this.context, this.player_x, this.player_y);
    })
  }
}

class Item {

  /**
   * An item represents an element in the game world, and stores its global x position and y
   * position.
   *
   * @param x The x position of the item.
   * @param y The y position of the item.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Draws a rectangle onto the screen at a position relative to the user.
   *
   * @param context The HTML canvas context.
   * @param player_x The player's x position.
   * @param player_y The player's y position.
   */
  draw(context, player_x, player_y) {
    console.log("drawing", this.x, this.y)
    context.beginPath(); // Start a new path
    context.rect(this.x - player_x, this.y + player_y, 150, 100); // Add a rectangle to the current path
    context.fill(); // Render the path
  }
}
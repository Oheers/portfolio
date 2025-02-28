export class SpriteRenderer {

    constructor(sprite_file_id, canvas) {
        this.sprite_file = document.getElementById(sprite_file_id);
        this.canvas = canvas;
    }

    drawSprite() {
        const ctx = this.canvas.getContext("2d");
        ctx.fillStyle = "red";
        ctx.drawImage(this.sprite_file, 288, 39, 16, 25, 10, 10, 48, 75);
    }

}
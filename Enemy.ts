﻿module GravityGuy {

    var cursors;
    var layer;
    var startMoving;


    export class Enemy extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x, y, 'enemy1', 0);
            //layer = layerT;
            startMoving = x;
            this.game.physics.arcade.enableBody(this);
            this.game.add.existing(this);
            //added
            //this.game = game;
            this.animations.add('walk');
            this.animations.play('walk', 8, true);
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.bounce.y = 0.2;
            this.body.collideWorldBounds = false;
            this.body.allowRotation = true;
            this.body.gravity.y = 18000;
            this.anchor.setTo(0.5, 0);
           
            //this.animations.add('walk', [0, 1, 2, 3, 4], 10, true);
        }

        update() {
            startMoving--;          
            //console.log("Hero " + gravityButton.isDown);

            this.body.velocity.y = 0;

                this.body.velocity.x = -70;
                //enemyChase.body.x = hero.body.x - 150;

            //if (gravityButton.isDown) {
           
            //if (gravityButton.isDown && this.body.blocked.down || gravityButton.isDown && this.body.blocked.up) {

            //    this.flipHero();
            //    heroJumped = true;
            //    jumpLocation = this.body.x;
            //    this.body.gravity.y = this.body.gravity.y * -1;
            //    //game.physics.arcade.gravity.y = game.physics.arcade.gravity.y * -1;
            //    first = false;
            //}

        }

        //flipHero() {
        //    if (floor) {

        //        this.anchor.setTo(1, .5); //so it flips around its middle
        //        this.scale.y = 1; //facing default direction
        //        this.scale.y = -1; //flipped
        //        floor = false;
        //    } else {
        //        this.anchor.setTo(1, .5); //so it flips around its middle
        //        this.scale.y = -1; //facing default direction
        //        this.scale.y = 1; //flipped
        //        floor = true;
        //    }
        //}
    }
}

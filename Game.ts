﻿module GravityGuy {

    export class Game extends Phaser.Game {

        constructor() {

            super(800, 512, Phaser.CANVAS, 'content', null);

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('Level1', Level1, false);
            this.state.add('GameOver', GameOver, false);

            this.state.start('Boot');

        }

    }

} 
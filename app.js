var game = new Phaser.Game(800, 512, Phaser.CANVAS, 'greenone', { preload: preload, create: create, update: update, render: render });
var map;
var hero;
var bullets;
var bullet;
var bulletTime = 0;
var enemyChase;
var cursors;
var background;
var layer;
var gravityButton;
var floor; // boolean for is character on the floor
var floorEnemy;
var first;
var jumpLocation;
var heroJumped = false;
function preload() {
    //        game.load.tilemap('level1', 'resources/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.tilemap('level2', 'resources/level2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles-1', 'resources/tiles-1.png');
    game.load.image('bullet', 'visuals/laser.png');
    game.load.image('background', 'visuals/bkgrnd_sand.png');
    game.load.spritesheet('hero', 'visuals/test_runner.png', 138, 115);
    game.load.spritesheet('enemyChase', 'visuals/megaenemy.png', 56.66, 60);
    //        game.load.audio('DnB', ['audio/Title_DnB.mp3', 'audio/Title_DnB.ogg']);
    game.load.audio('House', ['audio/Title_TechHouse.mp3', 'audio/Title_TechHouse.ogg']);
}
var music;
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 2000, 512);
    //MUSIC :D
    music = game.add.audio('House');
    music.play();
    //SCROLLING BACKGROUND :D
    background = game.add.tileSprite(0, 0, 1024, 512, 'background');
    background.fixedToCamera = true;
    //LEVEL :D
    map = game.add.tilemap('level2');
    //set collision
    map.addTilesetImage('tiles-1');
    map.setCollisionByExclusion([]);
    layer = map.createLayer('Tile Layer 1');
    //layer.debug = true;
    layer.resizeWorld();
    game.physics.arcade.gravity.y = 0;
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 1);
    bullets.setAll('anchor.y', 0);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
    first = true;
    //Phaser.Physics.Arcade.collideSpriteVsTilemapLayer(hero, 
    //hero sprite
    hero = game.add.sprite(150, 300, 'hero'); // Start location
    enemyChase = game.add.sprite(0, 300, 'enemyChase'); // Start location
    floor = true;
    floorEnemy = true;
    hero.animations.add('run');
    hero.animations.play('run', 10, true);
    game.physics.enable(hero, Phaser.Physics.ARCADE);
    hero.body.bounce.y = 0.2;
    hero.body.collideWorldBounds = true;
    game.camera.follow(hero);
    hero.body.allowRotation = true;
    enemyChase.animations.add('run');
    enemyChase.animations.play('run', 10, true);
    game.physics.enable(enemyChase, Phaser.Physics.ARCADE);
    enemyChase.body.bounce.y = 0.2;
    enemyChase.body.collideWorldBounds = true;
    enemyChase.body.allowRotation = true;
    hero.body.gravity.y = 18000;
    enemyChase.body.gravity.y = 18000;
    cursors = game.input.keyboard.createCursorKeys();
    gravityButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}
function update() {
    //console.log("HERO " + hero.body.x);
    //console.log("Enemy " + enemyChase.body.x);
    game.physics.arcade.collide(hero, layer);
    game.physics.arcade.collide(enemyChase, layer);
    background.tilePosition.x -= 2;
    hero.body.velocity.y = 0;
    hero.body.velocity.x = 400;
    //enemyChase.body.x = hero.body.x - 150;
    enemyChase.body.velocity.x = 400;
    enemyChase.body.velocity.y = 0;
    //if (gravityButton.isDown) {
    if (gravityButton.isDown && hero.body.blocked.down || gravityButton.isDown && hero.body.blocked.up) {
        flipHero();
        heroJumped = true;
        jumpLocation = hero.body.x;
        hero.body.gravity.y = hero.body.gravity.y * -1;
        //game.physics.arcade.gravity.y = game.physics.arcade.gravity.y * -1;
        first = false;
    }
    if (enemyChase.body.x >= jumpLocation && heroJumped && (enemyChase.body.blocked.down || enemyChase.body.blocked.up)) {
        if (floorEnemy != floor) {
            flipEnemy();
            enemyChase.body.gravity.y = enemyChase.body.gravity.y * -1;
        }
        heroJumped = false;
    }
    if (enemyChase.body.x <= hero.body.x - 300) {
        enemyChase.body.x = hero.body.x - 100;
    }
    if (cursors.right.isDown) {
        fireBullet();
    }
}
function flipHero() {
    if (floor) {
        hero.anchor.setTo(1, .5); //so it flips around its middle
        hero.scale.y = 1; //facing default direction
        hero.scale.y = -1; //flipped
        //enemyChase.anchor.setTo(1, .5); //so it flips around its middle
        //enemyChase.scale.y = 1; //facing default direction
        //enemyChase.scale.y = -1; //flipped
        floor = false;
    }
    else {
        hero.anchor.setTo(1, .5); //so it flips around its middle
        hero.scale.y = -1; //facing default direction
        hero.scale.y = 1; //flipped
        //enemyChase.anchor.setTo(1, .5); //so it flips around its middle
        //enemyChase.scale.y = -1; //facing default direction
        //enemyChase.scale.y = 1; //flipped
        floor = true;
    }
}
function flipEnemy() {
    if (floorEnemy) {
        //hero.anchor.setTo(1, .5); //so it flips around its middle
        //hero.scale.y = 1; //facing default direction
        //hero.scale.y = -1; //flipped
        enemyChase.anchor.setTo(1, .5); //so it flips around its middle
        enemyChase.scale.y = 1; //facing default direction
        enemyChase.scale.y = -1; //flipped
        floorEnemy = false;
    }
    else {
        //hero.anchor.setTo(1, .5); //so it flips around its middle
        //hero.scale.y = -1; //facing default direction
        //hero.scale.y = 1; //flipped
        enemyChase.anchor.setTo(1, .5); //so it flips around its middle
        enemyChase.scale.y = -1; //facing default direction
        enemyChase.scale.y = 1; //flipped
        floorEnemy = true;
    }
}
function fireBullet() {
    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime) {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);
        if (bullet) {
            if (floor) {
                if (first) {
                    //  And fire it
                    bullet.reset(hero.x + 170, hero.y + 30);
                    bullet.body.velocity.x = 10000;
                    bulletTime = game.time.now + 200;
                }
                else {
                    bullet.reset(hero.x + 30, hero.y - 30);
                    bullet.body.velocity.x = 10000;
                    bulletTime = game.time.now + 200;
                }
            }
            else {
                bullet.reset(hero.x + 30, hero.y + 5);
                bullet.body.velocity.x = 10000;
                bulletTime = game.time.now + 200;
            }
        }
    }
}
function resetBullet(bullet) {
    //  Called if the bullet goes out of the screen
    bullet.kill();
}
function render() {
    // game.debug.cameraInfo(game.camera, 500, 32);//164
    // game.debug.spriteCoords(hero, 32, 32);
}
//# sourceMappingURL=app.js.map
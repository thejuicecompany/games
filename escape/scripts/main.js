function init() {
    // To do: move these:
    document.getElementById('splash').style.display = 'none';
    const content = document.getElementById('content').style;
    const failed = document.getElementById('failed').style;
    const end = document.getElementById('end').style;
    const body = document.body.style;

    content.display = 'block';
    body.backgroundColor = '#121212';

    const canvas = document.getElementById("game");
    const render = canvas.getContext("2d");

    let xPlayer = 500;
    let gameState = false;
    let moveCheck = false;
    let xEnemy = 100;
    let yDoor = 0;
    let animPlayer = 200;
    let animState = true;
    let bgMusic = new Audio('sound/ambience.mp3');
    let deadSound = new Audio('sound/dead.mp3');
    let endMusic = new Audio('sound/end.mp3');
    let hornSound = new Audio('sound/horn.mp3');

    playerMovement({
        37: () => { moveCheck = true; xPlayer -= 1; },
        39: () => { moveCheck = true; gameState = true; if (xPlayer < canvas.width - 50) xPlayer += 1 }
    }, 20);

    bgMusic.volume = 0;
    bgMusic.play();
    var callLoop = setInterval(gameLoop, 20)
    function gameLoop() {
        if (bgMusic.volume < 1) { bgMusic.volume += 0.001; }
        
        if (gameState) {
          if (xEnemy + 50 > xPlayer) onFail()
        } else {
          if (xEnemy + 50 > xPlayer) {
            if (moveCheck) {
              onEnd()
            } else {
              onFail()
            }
          }
        }
        render.clearRect( 0, 0, canvas.width, canvas.height );

        // Background
        let bk = new Image();
        bk.src = 'images/background.png';
        render.drawImage(bk, 0, 0, 1000, 500);

        // Exit sign
        let esc = new Image();
        esc.src = 'images/esc.png';
        render.drawImage(esc, 910, 10, 80, 30);

        // Floor
        render.fillStyle = '#2888a6';
        render.fillRect( 0, 250, 1000, 50 );

        // Door.
        if (yDoor < 200) {
        yDoor += 0.55; }
        let ot = new Image();
        ot.src = 'images/outsude.png';
        render.drawImage(ot, 900, 50, 100, 200);
        let dr = new Image();
        dr.src = 'images/door.jpg';
        render.drawImage(dr, 900, 50, 100, yDoor);

        // Local player.
        if (animPlayer > 205) {
          animState = false;
        }
        else if (animPlayer < 195) {
          animState = true;
        }
        if (animState) {
          animPlayer += 0.3;
        } else {
          animPlayer -= 0.3;
        }
        //render.fillStyle = '#ffffff05';
        //render.fillRect( xPlayer, animPlayer, 44, 50 );

        let img = new Image();
        img.src = 'images/ghostHD.png';
        render.drawImage(img, xPlayer, animPlayer, 44, 50);


        // Enemy.
        let gradient = render.createLinearGradient(xEnemy-100,0, xEnemy+100,0);
        gradient.addColorStop(0, '#000');
        gradient.addColorStop(1, '#00000000');

        xEnemy += 1.5;
        let en = new Image();
        en.src = 'images/enemyHD.png';
        render.drawImage(en, xEnemy - 240, 0, 300, 300);

        render.fillStyle = gradient;
        render.fillRect( 0, 0, xEnemy + 60, 500 );
    }

    function onFail() {
        clearInterval(callLoop);
        bgMusic.pause();
        deadSound.play();
        content.display = 'none';
        failed.display = 'block';
        body.backgroundColor = '#000';
    }

    function onEnd() {
        clearInterval(callLoop);
        bgMusic.pause();
        content.display = 'none';
        end.display = 'block';
        body.backgroundColor = '#89b7ce';
        hornSound.volume = 0.6;
        endMusic.volume = 0.6;
        hornSound.play();
        endMusic.play();
        confetti.start()
    }
}

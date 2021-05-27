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

    let xPlayer = 180;
    let yPlayer = 600;
    let xEnemy = 100;
    let yDoor = 0;
	  let animPlayer = yPlayer;
	  let animDir = true; // true is up, false is down
	  let animState = 0;
    let animStateBack = 0;
    let animSpeed = 0.3;
    let bgMusic = new Audio('sound/ambience.mp3');
    let deadSound = new Audio('sound/dead.mp3');
    let endMusic = new Audio('sound/end.mp3');
    let hornSound = new Audio('sound/horn.mp3');

    playerMovement({
        37: () => { if (xPlayer > 6) xPlayer -= 1; },
        38: () => { if (yPlayer > 6) yPlayer -= 1; },
        39: () => { if (xPlayer < canvas.width - 50) xPlayer += 1 },
        40: () => { if (yPlayer < canvas.height - 56) yPlayer += 1 }
    }, 20);

    bgMusic.volume = 0;
    bgMusic.play();

    let callLoop = setInterval(gameLoop, 20)
    function gameLoop() {
        render.clearRect( 0, 0, canvas.width, canvas.height );

        // Background
        let bk = new Image();
        bk.src = 'images/2.png';
        render.drawImage(bk, 0, 0, 1000, 500);

        // Local player.


        if (animDir) {
          if (animState <= 5) {
            animState += animSpeed;
            animPlayer = yPlayer - animState;
          }
          if (animState >= 5) {
            animStateBack += animSpeed;
            animPlayer = yPlayer - animState + animStateBack;
            if (yPlayer - animState + animStateBack > yPlayer) {
              animStateBack = 0;
              animState = 0;
              animDir = false;
            }
          }
        } else {
          if (animState <= 5) {
            animState += animSpeed;
            animPlayer = yPlayer + animState;
          }
          if (animState >= 5) {
            animStateBack += animSpeed;
            animPlayer = yPlayer + animState - animStateBack;
            if (yPlayer + animState - animStateBack < yPlayer) {
              animStateBack = 0;
              animState = 0;
              animDir = true;
            }
          }
        }

        render.fillStyle = '#ffffff05';
        render.fillRect( xPlayer, yPlayer, 44, 50 );

        let img = new Image();
        img.src = 'images/ghostHD.png';
        render.drawImage(img, xPlayer, animPlayer, 44, 50);
    }

    function onFail() {
        bgMusic.pause();
        deadSound.play();
        clearInterval(callLoop);
        content.display = 'none';
        failed.display = 'block';
        body.backgroundColor = '#000';
    }

    function onEnd() {
        bgMusic.pause();
        clearInterval(callLoop);
        content.display = 'none';
        end.display = 'block';
        body.backgroundColor = '#89b7ce';
        hornSound.volume = 0.2;
        endMusic.volume = 0.4;
        hornSound.play();
        endMusic.play();
        confetti.start();
        setTimeout(() => { confetti.stop() }, 1000);
    }
}

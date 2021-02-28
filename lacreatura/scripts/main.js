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

    //onkeydown = () => onEnd()

    let xPlayer = 500;
    let xEnemy = 100;

    playerMovement({
        37: () => xPlayer -= 1,
        39: () => { if (xPlayer < canvas.width - 50) xPlayer += 1 }
    }, 20);

    var callLoop = setInterval(gameLoop, 20)
    function gameLoop() {  
        if (xEnemy + 50 > xPlayer) onFail()
        render.clearRect( 0, 0, canvas.width, canvas.height );

        // Door.


        // Local player.
        render.fillStyle = '#fff';
        render.fillRect( xPlayer, 200, 50, 50 );

        let img = new Image();
        img.src = 'images/player/Idle__000.png';
        render.drawImage(img, xPlayer, 200, 40, 60);
        

        // Enemy.
        //xEnemy += 1.5;
        render.fillStyle = '#000';
        render.fillRect( xEnemy, 200, 50, 50 );
    }

    function onFail() {
        clearInterval(callLoop);
        content.display = 'none';
        failed.display = 'block';
        body.backgroundColor = '#000';
    }

    function onEnd() {
        clearInterval(callLoop);
        content.display = 'none';
        end.display = 'block';
        body.backgroundColor = '#fff';
    }
}
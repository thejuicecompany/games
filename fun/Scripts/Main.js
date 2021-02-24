document.addEventListener( 'DOMContentLoaded', initGame, false );

function initGame() {
  var canvas = document.getElementById("gameWindow");
  var render = canvas.getContext("2d");
  setTimeout( startGame, 4000 );
  function startGame() {
    document.getElementById( 'splashScreen' ).style.display = 'none';
    document.getElementById( 'mainContent' ).style.display = 'block';
    document.body.style.backgroundColor = '#121212';
    setInterval( gameLoop, 0.1 ) // 16 milliseconds is around 60fps
  }

  var x = 0, y = 0;

  function gameLoop() {
    render.fillRect( x, y, 50, 50 );
    y += 1;
    if ( y > canvas.height - 50  ) {
      y = 0;
      x += 100;
    }
    if ( x > 700 ) {
      render.fillStyle = "white";
      render.font = "30px Arial";
      render.fillText("prison.",350,canvas.height / 2);
      throw new Error("game done, goodbye");
    }

  }
}

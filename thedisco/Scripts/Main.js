document.addEventListener( 'DOMContentLoaded', initGame, false );

function initGame() {
  var canvas = document.getElementById("gameWindow");
  var render = canvas.getContext("2d");
  setTimeout( startGame, 4000 );
  function startGame() {
    document.getElementById( 'splashScreen' ).style.display = 'none';
    document.getElementById( 'mainContent' ).style.display = 'block';
    document.body.style.backgroundColor = '#121212';
    setInterval( gameLoop, 1 ) // 16 milliseconds is around 60fps
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var colour = '#';
    for (var i = 0; i < 6; i++) {
      colour += letters[Math.floor(Math.random() * 16)];
    }
    return colour;
  }

  var x = 0, y = 0;

  function gameLoop() {
    x = Math.floor( Math.random() * (canvas.width - 50) );
    y = Math.floor( Math.random() * (canvas.height - 50) );
    render.fillStyle = getRandomColor();
    render.fillRect( x, y, 50, 50 );

  }
}

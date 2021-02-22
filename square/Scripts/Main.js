document.addEventListener( "DOMContentLoaded", initCanvas, false );

function initCanvas() {
  var canvas = document.getElementById( "gameWindow" );
  var ctx = canvas.getContext( "2d" );

  function getMousePos( canvas, evt ) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: ( evt.clientX - rect.left ) / ( rect.right - rect.left ) * canvas.width,
      y: ( evt.clientY - rect.top ) / ( rect.bottom - rect.top ) * canvas.height };
  }
  var squarePosX, squarePosY;
  var squareWidth = 50, squareHeight = 50;
  var hitBox = 50;
  moveSpeed = 20;
  var firstTime = true;

  function drawSquare( i ) {
    var mousePos = getMousePos( canvas, i );
    if ( firstTime ) { squarePosX = Math.floor( Math.random() * (canvas.width - squareWidth) ); squarePosY = Math.floor( Math.random() * (canvas.height - squareHeight) ); firstTime = false; }

    // Left side
    if ( mousePos.x < squarePosX && mousePos.x > ( squarePosX - hitBox ) && mousePos.y > squarePosY && mousePos.y < ( squarePosY + hitBox ) )
      { squarePosX = mousePos.x + ( hitBox + moveSpeed ); }
    // Right side
    if ( mousePos.x > ( squarePosX + squareWidth ) && mousePos.x < ( ( squarePosX + squareWidth ) + hitBox ) && mousePos.y > squarePosY && mousePos.y < ( squarePosY + hitBox ) )
      { squarePosX = mousePos.x - ( ( hitBox * 2) + moveSpeed ); }
    // Top side
    if (mousePos.y < squarePosY && mousePos.y > ( squarePosY - hitBox ) && mousePos.x > squarePosX && mousePos.x < ( squarePosX + hitBox ) )
      { squarePosY = mousePos.y + ( hitBox + moveSpeed ); }
    // Bottom side
    if (mousePos.y > ( squarePosY + squareWidth ) && mousePos.y < ( ( squarePosY + squareWidth ) + hitBox ) && mousePos.x > squarePosX && mousePos.x < ( squarePosX + hitBox ) )
      { squarePosY = mousePos.y - ( ( hitBox * 2) + moveSpeed ); }
    // Top left corner
    if ( mousePos.x < squarePosX && mousePos.x > ( squarePosX - hitBox ) && mousePos.y > ( squarePosY - hitBox ) && mousePos.y < ( ( squarePosY - hitBox ) + hitBox ) )
      {squarePosX += moveSpeed; squarePosY += moveSpeed;}
    // Bottom left corner
    if ( mousePos.x < squarePosX && mousePos.x > ( squarePosX - hitBox ) && mousePos.y > ( squarePosY + hitBox ) && mousePos.y < ( ( squarePosY + hitBox ) + hitBox ) )
      {squarePosX += moveSpeed; squarePosY -= moveSpeed;}
    // Top right corner
    if ( mousePos.x > ( squarePosX + squareWidth ) && mousePos.x < ( ( squarePosX + squareWidth ) + hitBox ) && mousePos.y > ( squarePosY - hitBox ) && mousePos.y < ( ( squarePosY - hitBox ) + hitBox ) )
      {squarePosX -= moveSpeed; squarePosY += moveSpeed;}
    // Bottom right corner
    if ( mousePos.x > ( squarePosX + squareWidth ) && mousePos.x < ( ( squarePosX + squareWidth ) + hitBox ) && mousePos.y > ( squarePosY + hitBox ) && mousePos.y < ( ( squarePosY + hitBox ) + hitBox ) )
      {squarePosX -= moveSpeed; squarePosY -= moveSpeed;}
    // On the red circle
    if (mousePos.x > squarePosX && mousePos.x < (squarePosX + squareWidth ) && mousePos.y > squarePosY && mousePos.y < (squarePosY + squareHeight ) )
    {squarePosX += 70; squarePosY += 70;}

    if ( squarePosX > ( canvas.width - squareWidth ) || squarePosY > ( canvas.height - squareHeight ) || squarePosX < 0 || squarePosY < 0 )
    { squarePosX = Math.floor( Math.random() * (canvas.width - squareWidth) ); squarePosY = Math.floor( Math.random() * (canvas.height - squareHeight) ); }



    ctx.clearRect( 0, 0, canvas.width, canvas.height );
    ctx.fillStyle = "#d23535";
    ctx.fillRect( squarePosX, squarePosY, squareWidth, squareHeight );
    ctx.fillStyle = "#ffffff30";
/*    // Render hitboxes
    ctx.fillRect( (squarePosX - hitBox), squarePosY, squareWidth, squareHeight ); // Left hitbox
    ctx.fillRect( (squarePosX + hitBox), squarePosY, squareWidth, squareHeight ); // Right hitbox
    ctx.fillRect( squarePosX, (squarePosY - hitBox), squareWidth, squareHeight ); // Top hitbox
    ctx.fillRect( squarePosX, (squarePosY + hitBox), squareWidth, squareHeight ); // Bottom hitbox
    ctx.fillStyle = "#ffffff24";
    ctx.fillRect( (squarePosX - hitBox), (squarePosY - squareWidth), squareWidth, squareHeight ); // Top left corner hitbox
    ctx.fillRect( (squarePosX - hitBox), (squarePosY + squareWidth), squareWidth, squareHeight ); // Bottom left corner hitbox
    ctx.fillRect( (squarePosX + hitBox), ( squarePosY - hitBox ), squareWidth, squareHeight ); // Top right corner hitbox
    ctx.fillRect( (squarePosX + hitBox), ( squarePosY + hitBox ), squareWidth, squareHeight ); // Bottom right corner hitbox*/
  }
  window.addEventListener( 'load', drawSquare, false );
  window.addEventListener( 'mousemove', drawSquare, false );
  document.addEventListener('contextmenu', event => event.preventDefault());

}

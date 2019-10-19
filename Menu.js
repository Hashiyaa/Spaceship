window.onload = function(){
    // Get canvas element and its context
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
    let ctx = canvas.getContext('2d');

    // Button position and dimensions
    var buttonX = 80;
    var buttonY = 80;
    var buttonW = 60;
    var buttonH = 30;

    // Render button
    ctx.fillStyle = 'red';
    ctx.fillRect(buttonX, buttonY, buttonW, buttonH);

    // Add event listener to canvas element
    canvas.addEventListener('click', function(event) {
    // Control that click event occurred within position of button
    // NOTE: This assumes canvas is positioned at top left corner 
    if (
        event.x > buttonX && 
        event.x < buttonX + buttonW &&
        event.y > buttonY && 
        event.y < buttonY + buttonH
    ){
        // Executes if button was clicked!
      }
    });
}
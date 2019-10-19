window.onload = function(){
    // Get canvas element and its context
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
    let ctx = canvas.getContext('2d');

    let MainFrame = document.getElementById("Mainframe");

    let StartButton = document.createElement("button");
    
    StartButton.style.backgroundColor = grey;

    let StartButtonStyle = 
    "background-color: grey;\
        left: 1150px;\
        position: absolute;\
        width: 280px;\
        height: 110px;\
        font-size: 40px;\
        top: 220px;\
    ";

    MainFrame.appendChild(StartButton);
}


window.onload = function(){
    // Get canvas element and its context
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
    let ctx = canvas.getContext('2d');

    let MainFrame = document.getElementById("MainFrame");

    let StartButton = document.createElement("button");

    let StartButtonStyle = 
    "background-color: grey;\
        left: 1150px;\
        position: absolute;\
        width: 280px;\
        height: 110px;\
        font-size: 40px;\
        top: 220px;\
    ";
    StartButton.style = StartButtonStyle;

    StartButton.setAttribute("onclick","LoadScene()");
    StartButton.setAttribute("id","StartButton");
    MainFrame.appendChild(StartButton);
}
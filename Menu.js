

window.onload = function(){
    // Get canvas element and its context
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
    let ctx = canvas.getContext('2d');

    let MainFrame = document.getElementById("MainFrame");

    let StartButton = document.createElement("button");

    StartButton.setAttribute("onclick","LoadScene()");
    StartButton.setAttribute("id","StartButton");
    MainFrame.appendChild(StartButton);
}
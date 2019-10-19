
window.onload = function(){
    // Get canvas element and its context
    let canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
    let ctx = canvas.getContext('2d');

    let MainFrame = document.getElementById("MainFrame");

    let StartButton = document.createElement("button");
<<<<<<< HEAD

    StartButton.innerHTML = "START";
=======
>>>>>>> 2e275f49b83fa1263e3b3d9a61f703e218f99186
    StartButton.setAttribute("onclick","LoadScene()");
    StartButton.setAttribute("id","StartButton");
    MainFrame.appendChild(StartButton);
}
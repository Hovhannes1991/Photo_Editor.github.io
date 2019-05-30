var controlers_blok = document.getElementsByClassName("controlers_blok")[0];

var p = controlers_blok.getElementsByTagName("p"); //for values in tag <p>

var file = document.getElementById("file"); //input type file

var before = document.getElementsByClassName("before")[0];
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var canvas2 = document.getElementById("canvas2");
var ctx2 = canvas2.getContext("2d");

var image = new Image();
image.onload = function() {
    reset();
    before.appendChild(image);
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    canvas2.width = image.naturalWidth;
    canvas2.height = image.naturalHeight;
    ctx.drawImage(image, 0, 0);
}

file.onchange = previewFile;

function previewFile() {
    before.innerHTML = "";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx2.clearRect(0, 0, canvas.width, canvas.height);

    var url = (URL.createObjectURL(file.files[0]));
    image.src = url;
}




var filters = controlers_blok.getElementsByTagName("input");

for (let f = 0; f < filters.length; f++) {
    filters[f].addEventListener("change", addFilter);
}

function addFilter() {
    let blur = document.getElementById("blur").value;
    let grayscale = document.getElementById("grayscale").value;
    let brightness = document.getElementById("brightness").value;
    let contrast = document.getElementById("contrast").value;
    let opacity = document.getElementById("opacity").value;
    let sepia = document.getElementById("sepia").value;
    let saturate = document.getElementById("saturate").value;
    canvas.style.filter = `blur(${blur}px) grayscale(${grayscale}) sepia(${sepia}) opacity(${opacity}) brightness(${brightness}) contrast(${contrast}) saturate(${saturate})`;

    this.parentNode.getElementsByTagName("p")[0].innerHTML = this.value;
}

document.getElementById("reset").addEventListener("click", reset);

function reset() {
    document.getElementById("blur").value = 0;
    document.getElementById("grayscale").value = 0;
    document.getElementById("brightness").value = 1;
    document.getElementById("contrast").value = 1;
    document.getElementById("opacity").value = 1;
    document.getElementById("sepia").value = 0;
    document.getElementById("saturate").value = 1;

    canvas.style.filter = `blur(0px) grayscale(0) sepia(0) opacity(1) brightness(1) contrast(1) saturate(1)`;
    ctx.filter = `blur(0px) grayscale(0) sepia(0) opacity(1) brightness(1) contrast(1) saturate(1)`;
    canvas2.style.filter = `blur(0px) grayscale(0) sepia(0) opacity(1) brightness(1) contrast(1) saturate(1)`;
    ctx2.filter = `blur(0px) grayscale(0) sepia(0) opacity(1) brightness(1) contrast(1) saturate(1)`;
    ctx.drawImage(image, 0, 0);
    ctx2.drawImage(image, 0, 0);

    document.getElementById("blur_value").innerHTML = 0;
    document.getElementById("grayscale_value").innerHTML = 0;
    document.getElementById("brightness_value").innerHTML = 1;
    document.getElementById("contrast_value").innerHTML = 1;
    document.getElementById("opacity_value").innerHTML = 1;
    document.getElementById("sepia_value").innerHTML = 0;
    document.getElementById("saturate_value").innerHTML = 1;
}

document.getElementById("saveImage").addEventListener("click", saveImage);

function saveImage() {    
    var computedStyle = getComputedStyle(canvas).filter;
    ctx2.filter = computedStyle;
    ctx2.drawImage(canvas, 0, 0);
    var link = document.getElementById("saveImage");
    link.href = canvas2.toDataURL();
    link.download = "mypainting.png";
}


// function saveImage() {    
//     var computedStyle = getComputedStyle(canvas).filter;
//     ctx.filter = computedStyle;
//     ctx.drawImage(canvas, 0, 0);
//     var link = document.getElementById("saveImage");
//     link.href = canvas.toDataURL();
//     link.download = "mypainting.png";
// }
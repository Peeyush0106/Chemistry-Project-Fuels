var currentQuote = -1;
var slide = 0;
var bgsDone = ["no", "no", "no", "no", "no"];
var state = "greet"

async function blackOut() {
    state = "present";
    for (var i = 0; i < 1.07; i += 0.07) {
        await new Promise(r => setTimeout(r, 30));
        console.log("iterate")
        document.getElementById("blackout").style.opacity = i;
    }
    document.getElementById("greet").innerHTML = ""
    document.getElementById("greet-bg").hidden = true;
    document.getElementById("blackout").style.opacity = 0;
    document.getElementById("slides").hidden = false;
    nextSlide();
}

async function nextSlide() {
    if (document.getElementById("slide-" + slide)) {
        document.getElementById("slide-" + slide).hidden = true
    }
    slide += 1;
    if (!document.getElementById("slide-" + slide)) {
        showThanks();
    }
    else {
        selectImage();
        document.getElementById("slide-" + slide).hidden = false;
    }
}

async function selectImage() {
    var bgNo = Math.floor(Math.random() * 5) + 1;
    if (bgsDone[bgNo - 1] === "yes") {
        selectImage();
        await new Promise(r => setTimeout(r, 1));
    }
    else {
        bgsDone[bgNo - 1] = "yes";
        document.getElementById("greet-bg").src = "bg-" + bgNo + ".jpg";
        document.getElementById("greet-bg").hidden = false;
    }
}

function showThanks() {
    document.getElementById("slides").hidden = true;
    document.getElementById("greet-bg").hidden = true;
    document.getElementById("blackout").hidden = true;
    document.getElementById("glass-over-slide").hidden = true;
    document.getElementById("thanks").hidden = false;
}

document.body.onkeypress = function (e) {
    var k = e ? e.which : window.event.keyCode;
    if (k == 32) {
        if (state === "greet") {
            blackOut()
        }
        else {
            nextSlide();
        }
    }
}
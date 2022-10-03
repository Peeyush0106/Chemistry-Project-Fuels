var currentQuote = -1;
var timer = 10;

var slide = 0;

var bgsDone = ["no", "no", "no", "no", "no"];

updateStartupTimer();

async function updateStartupTimer() {
    for (var i = 5; i > 0; i--) {
        document.getElementById("start").innerText = i;
        await new Promise(r => setTimeout(r, 1000));
    }
    blackOut();
}

async function blackOut() {
    for (var i = 0; i < 1.07; i += 0.07) {
        await new Promise(r => setTimeout(r, 30));
        console.log("iterate")
        document.getElementById("blackout").style.opacity = i;
    }
    document.getElementById("greet").innerHTML = ""
    document.getElementById("start").hidden = true;
    document.getElementById("greet-bg").hidden = true;
    document.getElementById("blackout").style.opacity = 0;
    // startConfetti();
    document.getElementById("slides").hidden = false;
    document.getElementById("timer").hidden = false;
    showSlide();
    updateTimer();
}

async function updateTimer() {
    document.getElementById("timer").innerText = timer;
    await new Promise(r => setTimeout(r, 799))
    if (timer > 0) {
        timer -= 1;
        document.getElementById("timer").innerText = timer;
        updateTimer();
    }
    else {
        showSlide();
        timer = 20;
        updateTimer();
    }
}

function showSlide() {
    if (document.getElementById("slide-" + slide)) document.getElementById("slide-" + slide).hidden = true
    slide += 1;
    if (!document.getElementById("slide-" + slide)) showThanks();
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
    document.getElementById("timer").hidden = true;
    document.getElementById("slides").hidden = true;
    document.getElementById("thanks").hidden = false;
}

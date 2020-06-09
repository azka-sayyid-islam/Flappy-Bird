var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
const tmbNaik = document.querySelector("button");
tmbNaik.addEventListener("click", terbang);
// upload gambar

const bird = new Image();
const bg = new Image();
const pipaAtas = new Image();
const pipaBawah = new Image();
const tanah = new Image();


bird.src = "images/bird.png";
bg.src = "images/bg.png";
pipaAtas.src = "images/pipeNorth.png";
pipaBawah.src = "images/pipeSouth.png";
tanah.src = "images/fg.png";

// variable tambahan
var gap = 85;
var bx = 10;
var by = 150;
var gravitasi = 1;
var skor = 0;
// tekan atas

var suaraTerbang = new Audio();
var suaraSkor = new Audio();

suaraTerbang.src = "sounds/fly.mp3";
suaraSkor.src = "sounds/score.mp3";
document.addEventListener("keydown", terbang);

function terbang() {
    by -= 30;
    suaraTerbang.play();
}

// kordinat pipa

var pipa = [];
pipa[0] = {
    x: cvs.width,
    y: 0
};

// fungsi gambar

function lukis() {
    ctx.drawImage(bg, 0, 0);

    for (var i = 0; i < pipa.length; i++) {
        ctx.drawImage(pipaAtas, pipa[i].x, pipa[i].y);
        ctx.drawImage(pipaBawah, pipa[i].x, pipa[i].y + pipaAtas.height + gap);

        pipa[i].x--;


        if (pipa[i].x == 100) {
            pipa.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipaAtas.height) - pipaAtas.height
            });
        }

        // ketika burung menyentuh pipa

        if (bx + bird.width >= pipa[i].x && bx <= pipa[i].x + pipaAtas.width && (by <= pipa[i].y + pipaAtas.height || by + bird.height >= pipa[i].y + pipaAtas.height + gap) || by + bird.height >= cvs.height - tanah.height) {
            location.reload();
        }

        if (pipa[i].x == 5) {
            skor++;
            suaraSkor.play();
        }

    }


    ctx.drawImage(tanah, 0, cvs.height - tanah.height);
    ctx.drawImage(bird, bx, by);
    by += gravitasi;
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + skor, 10, cvs.height - 20);
    requestAnimationFrame(lukis);
}

lukis();
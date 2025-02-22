const player = document.getElementById('player');
const chaser = document.getElementById('chaser');
const counterElement = document.getElementById('counter');
const chaseSound = document.getElementById('chaseSound');
const catchSound = document.getElementById('catchSound');

let counter = 0;

const mazeWidth = 400;
const mazeHeight = 400;
const playerSize = 40; // حجم الصورة

let playerX = 0;
let playerY = 0;

let chaserX = mazeWidth - playerSize;
let chaserY = mazeHeight - playerSize;

// تشغيل صوت المطاردة عند بدء اللعبة
chaseSound.play();

function movePlayer(event) {
    const key = event.key;
    const step = 10;

    if (key === 'ArrowUp' && playerY > 0) {
        playerY -= step;
    } else if (key === 'ArrowDown' && playerY < mazeHeight - playerSize) {
        playerY += step;
    } else if (key === 'ArrowLeft' && playerX > 0) {
        playerX -= step;
    } else if (key === 'ArrowRight' && playerX < mazeWidth - playerSize) {
        playerX += step;
    }

    player.style.top = playerY + 'px';
    player.style.left = playerX + 'px';

    checkCollision();
}

function moveChaser() {
    const step = 5;

    if (chaserX < playerX) {
        chaserX += step;
    } else if (chaserX > playerX) {
        chaserX -= step;
    }

    if (chaserY < playerY) {
        chaserY += step;
    } else if (chaserY > playerY) {
        chaserY -= step;
    }

    chaser.style.top = chaserY + 'px';
    chaser.style.left = chaserX + 'px';

    checkCollision();
}

function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const chaserRect = chaser.getBoundingClientRect();

    if (playerRect.left < chaserRect.right &&
        playerRect.right > chaserRect.left &&
        playerRect.top < chaserRect.bottom &&
        playerRect.bottom > chaserRect.top) {
        chaseSound.pause(); // إيقاف صوت المطاردة
        catchSound.play(); // تشغيل صوت الاصطدام
        document.body.classList.add('collision'); // إضافة كلاس لتغيير لون الخلفية
        setTimeout(() => {
            document.body.classList.remove('collision'); // إزالة الكلاس بعد فترة
        }, 1000); // تغيير اللون لمدة ثانية
        alert('لقد أمسك بك!');
        resetGame();
    } else {
        counter++;
        counterElement.textContent = counter;
    }
}

function resetGame() {
    playerX = 0;
    playerY = 0;
    chaserX = mazeWidth - playerSize;
    chaserY = mazeHeight - playerSize;

    player.style.top = playerY + 'px';
    player.style.left = playerX + 'px';
    chaser.style.top = chaserY + 'px';
    chaser.style.left = chaserX + 'px';

    counter = 0;
    counterElement.textContent = counter;

    chaseSound.currentTime = 0; // إعادة تعيين صوت المطاردة
    chaseSound.play(); // تشغيل صوت المطاردة مرة أخرى
}

document.addEventListener('keydown', movePlayer);
setInterval(moveChaser, 100);
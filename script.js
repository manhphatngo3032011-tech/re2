let scale = 1;
let noCount = 0;

const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const surpriseImg = document.getElementById('surprise-img');
const questionTitle = document.querySelector('.box-wrapper h1');
const messageText = document.getElementById('message-text');
const bgMusic = document.getElementById('bg-music');

// 🎬 Lấy tham chiếu 2 thẻ video
const videoLeft = document.getElementById('video-left');
const videoRight = document.getElementById('video-right');

function startMusic() {
    if (bgMusic && bgMusic.paused) {
        bgMusic.play().catch(err => console.log("Lỗi phát nhạc:", err));
    }
}

const messagesList = [
    "Tồi",
    "fake friend",
    "tệ quá",
    "Cho chọn lại 1 lần nữa á",
    "Cơ hội cuối cùng đó nha!",
    "Bấm 'Có' ngay đi cho rồi!"
];

const noImageList = [
    "img/angrybird3.gif", 
    "img/angrybird.gif", 
    "img/bird.gif", 
    "img/angrybird2.gif"
];

const yesImage = "img/giphy.gif";

btnNo.addEventListener('click', () => {
    // 🎵 CHỈ PHÁT NHẠC NỀN KHI BẤM "KHÔNG"
    if (bgMusic && bgMusic.paused) {
        bgMusic.play().catch(err => console.log("Lỗi phát nhạc:", err));
    }

    scale += 0.4;
    btnYes.style.transform = `scale(${scale})`;

    if (messageText) {
        if (noCount < messagesList.length) {
            messageText.textContent = messagesList[noCount];
        } else {
            messageText.textContent = messagesList[messagesList.length - 1];
        }
    }
    noCount++;

    const randomIndex = Math.floor(Math.random() * noImageList.length);
    surpriseImg.src = noImageList[randomIndex];
    surpriseImg.style.display = 'block';

    if (scale > 8) {
        btnYes.style.position = 'fixed';
        btnYes.style.top = '0';
        btnYes.style.left = '0';
        btnYes.style.width = '100vw';
        btnYes.style.height = '100vh';
        btnYes.style.borderRadius = '0';
        btnYes.style.fontSize = '50px';
        btnYes.style.display = 'flex';
        btnYes.style.alignItems = 'center';
        btnYes.style.justifyContent = 'center';
    }
});

// -------------------------------------------------------------
// SỰ KIỆN KHI BẤM NÚT "CÓ" -> DỪNG NHẠC NỀN & PHÁT TIẾNG VIDEO
// -------------------------------------------------------------
btnYes.addEventListener('click', () => {
    // 🔇 1. Tắt/Dừng nhạc nền ngay lập tức
    if (bgMusic) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
    }

    questionTitle.textContent = "Biết ngay mà! Daniel đẹp trai nhất lại còn vừa lạnh lùng và trầm tính nữa!";

    if (messageText) messageText.textContent = "";

    surpriseImg.src = yesImage;
    surpriseImg.style.display = 'block';

    // 🎬 2. Hiển thị 2 video, bật tiếng (muted = false) và phát video
    if (videoLeft && videoRight) {
        videoLeft.style.display = 'block';
        videoRight.style.display = 'block';
        
        // Bật tiếng cho video
        videoLeft.muted = false;
        videoRight.muted = false;

        videoLeft.play().catch(err => console.log("Lỗi phát video trái:", err));
        videoRight.play().catch(err => console.log("Lỗi phát video phải:", err));
    }

    btnYes.style.position = 'static';
    btnYes.style.transform = 'scale(1)';
    btnYes.style.width = 'auto';
    btnYes.style.height = 'auto';
    btnYes.style.fontSize = '16px';

    btnNo.style.display = 'none';
});

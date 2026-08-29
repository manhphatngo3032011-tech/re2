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
// Trong sự kiện btnYes.addEventListener('click', ...)
btnYes.addEventListener('click', () => {
    // 1. Tắt nhạc nền
    if (bgMusic) {
        bgMusic.pause();
        bgMusic.currentTime = 0;
    }

    // 2. Đổi chữ & ảnh
    questionTitle.textContent = "Biết ngay mà! Daniel đẹp trai nhất lại còn vừa lạnh lùng và trầm tính nữa!";
    if (messageText) messageText.textContent = "";
    surpriseImg.src = yesImage;
    surpriseImg.style.display = 'block';

    // 3. Xử lý phát video chuẩn Mobile
    if (videoLeft && videoRight) {
        videoLeft.style.display = 'block';
        videoRight.style.display = 'block';

        // Bắt buộc bỏ muted và gọi play trong handler click để pass qua chính sách Safari/Chrome
        videoLeft.muted = false;
        videoRight.muted = false;

        const playPromiseLeft = videoLeft.play();
        if (playPromiseLeft !== undefined) {
            playPromiseLeft.catch(() => {
                // Nếu trình duyệt di động vẫn chặn tiếng, phát ở chế độ muted để video không bị dừng
                videoLeft.muted = true;
                videoLeft.play();
            });
        }

        const playPromiseRight = videoRight.play();
        if (playPromiseRight !== undefined) {
            playPromiseRight.catch(() => {
                videoRight.muted = true;
                videoRight.play();
            });
        }
    }

    btnYes.style.position = 'static';
    btnYes.style.transform = 'scale(1)';
    btnYes.style.width = 'auto';
    btnYes.style.height = 'auto';
    btnYes.style.fontSize = '16px';
    btnNo.style.display = 'none';
});

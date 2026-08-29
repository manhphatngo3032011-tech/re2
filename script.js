let scale = 1; // Tỉ lệ phóng to ban đầu của nút "Có"
let noCount = 0; // Biến đếm số lần bấm "Không"

const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const surpriseImg = document.getElementById('surprise-img');
const questionTitle = document.querySelector('.box-wrapper h1');
const messageText = document.getElementById('message-text');
const bgMusic = document.getElementById('bg-music');

// 🎵 Hàm phát nhạc khi người dùng tương tác
function startMusic() {
    if (bgMusic && bgMusic.paused) {
        bgMusic.play().catch(err => console.log("Lỗi phát nhạc:", err));
    }
}

// 🔴 1. DANH SÁCH CÁC CÂU THÔNG ĐIỆP XUẤT HIỆN THEO THỨ TỰ KHI BẤM "KHÔNG"
const messagesList = [
    "Cho bạn suy nghĩ lại đó! ",
    "Thật sự bấm Không luôn hả? ",
    "Suy nghĩ kỹ lại đi mà... ",
    "Này nhé, đừng có dối lòng nữa! ",
    "Cơ hội cuối cùng đó nha! ",
    "Bấm 'Có' ngay đi cho rồi! "
];

// 🔴 2. DANH SÁCH HÌNH KHI BẤM "KHÔNG" (Hiện ngẫu nhiên từ thư mục img/)
const noImageList = [
    "img/angrybird3.gif", 
    "img/angrybird.gif", 
    "img/bird.gif", 
    "img/angrybird2.gif"
];

// 🟢 3. HÌNH XUẤT HIỆN KHI BẤM "CÓ"
const yesImage = "img/giphy.gif";

// -------------------------------------------------------------
// SỰ KIỆN KHI BẤM NÚT "KHÔNG"
// -------------------------------------------------------------
btnNo.addEventListener('click', () => {
    // 🔊 Phát nhạc ngay khi click
    startMusic();

    // 1. Phóng to nút "Có"
    scale += 0.4;
    btnYes.style.transform = `scale(${scale})`;

    // 2. Hiện câu thông điệp lần lượt theo thứ tự
    if (messageText) {
        if (noCount < messagesList.length) {
            messageText.textContent = messagesList[noCount];
        } else {
            messageText.textContent = messagesList[messagesList.length - 1];
        }
    }
    noCount++;

    // 3. Chọn ngẫu nhiên 1 ảnh trong danh sách ảnh "Không"
    const randomIndex = Math.floor(Math.random() * noImageList.length);
    surpriseImg.src = noImageList[randomIndex];
    surpriseImg.style.display = 'block';

    // 4. Nếu phóng to quá mức, bao phủ toàn màn hình
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
// SỰ KIỆN KHI BẤM NÚT "CÓ"
// -------------------------------------------------------------
btnYes.addEventListener('click', () => {
    // 🔊 Phát nhạc nếu bấm "Có" ngay từ đầu
    startMusic();

    // 1. Đổi tiêu đề
    questionTitle.textContent = "Biết ngay mà! Daniel đẹp trai nhất lại còn vừa lạnh lùng và trầm tính nữa!";

    // 2. Xóa dòng câu thông điệp nhắc nhở
    if (messageText) messageText.textContent = "";

    // 3. Đổi sang ảnh "Có"
    surpriseImg.src = yesImage;
    surpriseImg.style.display = 'block';

    // 4. Đưa nút "Có" về lại bình thường
    btnYes.style.position = 'static';
    btnYes.style.transform = 'scale(1)';
    btnYes.style.width = 'auto';
    btnYes.style.height = 'auto';
    btnYes.style.fontSize = '16px';

    // 5. Ẩn nút "Không" đi
    btnNo.style.display = 'none';
});

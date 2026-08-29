let scale = 1; // Tỉ lệ phóng to ban đầu của nút "Có"

const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const surpriseImg = document.getElementById('surprise-img');
const questionTitle = document.querySelector('.box-wrapper h1');

// 🔴 1. DANH SÁCH HÌNH KHI BẤM "KHÔNG" (Hiện ngẫu nhiên)
const noImageList = [
    "img/angrybird3.gif",                                 // Ảnh 1
    "img/angrybird.gif", // Ảnh 2
    "img/bird.gif", // Ảnh 3
    "img/angrybird2.gif"       // Ảnh 4
];

// 🟢 2. HÌNH XUẤT HIỆN KHI BẤM "CÓ" (Thay đường dẫn ảnh bạn muốn vào đây)
const yesImage = "img/giphy.gif";

// Sự kiện khi bấm "Không"
btnNo.addEventListener('click', () => {
    // Phóng to nút "Có"
    scale += 0.4;
    btnYes.style.transform = `scale(${scale})`;

    // Chọn ngẫu nhiên 1 ảnh trong danh sách ảnh "Không"
    const randomIndex = Math.floor(Math.random() * noImageList.length);
    surpriseImg.src = noImageList[randomIndex];
    surpriseImg.style.display = 'block';

    // Nếu phóng to quá mức, bao phủ toàn màn hình
    if (scale > 8) {
        btnYes.style.position = 'fixed';
        btnYes.style.top = '0';
        btnYes.style.left = '0';
        btnYes.style.width = '100vw';
        btnYes.style.height = '100vh';
        btnYes.style.borderRadius = '0';
        btnYes.style.fontSize = '50px';
    }
});

// Sự kiện khi bấm "Có"
btnYes.addEventListener('click', () => {
    // Đổi tiêu đề
    questionTitle.textContent = "Biết ngay mà! Daniel đẹp trai nhất lại còn vừa lạnh lùng và trầm tính nữa!";

    // Đổi sang ảnh "Có"
    surpriseImg.src = yesImage;
    surpriseImg.style.display = 'block';

    // Đưa nút "Có" về lại bình thường (trường hợp đang bị phóng to tràn màn hình)
    btnYes.style.position = 'static';
    btnYes.style.transform = 'scale(1)';
    btnYes.style.width = 'auto';
    btnYes.style.height = 'auto';
    btnYes.style.fontSize = '16px';

    // Ẩn nút "Không" đi
    btnNo.style.display = 'none';
});
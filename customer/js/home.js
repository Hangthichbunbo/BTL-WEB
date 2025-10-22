document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slider img");

  let index = 0;

  function autoScroll() {
    index++;
    if (index >= slides.length) {
      index = 0;
    }
    slider.scrollTo({
      left: slides[index].offsetLeft,
      behavior: "smooth",
    });
  }
  setInterval(autoScroll, 4000);

  // Ẩn và hiện Mobile Menu
  const mobileBtn = document.querySelector(".js-menu-btn");
  const mobile = document.querySelector(".js-nav");
  const mobileContainer = document.querySelector(".js-nav-container");

  function hideMobileMenu() {
    mobile.classList.remove("open");
  }

  mobile.addEventListener("click", hideMobileMenu);

  mobileContainer.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  mobileBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    mobile.classList.toggle("open");
  });
});




// ==== Modal đặt phòng ====
const popup = document.getElementById("bookingPopup");
const closeBtn = document.getElementById("closePopup");
const form = document.getElementById("bookingForm");
const roomTypeInput = document.getElementById("roomType");
const rooms = [
  { name: "PHÒNG DELUXE", price: 2.000000},
  { name: "PHÒNG GRAND DELUXE", price: 2.400000 },
  { name: "PHÒNG PREMIER QUAD", price: 2.600000 },
  { name: "PHÒNG EXECUTIVE", price: 3.200000 },
  { name: "PHÒNG PARK VIEW EXECUTIVE", price: 4.200000 },
  { name: "PHÒNG EXECUTIVE SUITE", price: 5.600000 },
  { name: "PRESIDENTIAL SUITE", price: 12.000000 }
];


const paymentPopup = document.getElementById("paymentPopup");
const closePayment = document.getElementById("closePayment");
const btnDone = document.getElementById("btnDone");

const roomPriceDisplay = document.getElementById("roomPrice");

// Tự động điền danh sách phòng vào <select>
rooms.forEach(room => {
  const option = document.createElement("option");
  option.value = room.name;
  option.textContent = room.name;
  roomTypeInput.appendChild(option);
});

// Khi người dùng chọn loại phòng → hiển thị giá
roomTypeInput.addEventListener("change", () => {
  const selected = rooms.find(r => r.name === roomTypeInput.value);
  roomPriceDisplay.textContent = selected ? selected.price.toLocaleString("vi-VN") : "0";
});


// ==== Hàm mở popup đặt phòng ====
function openModal(room) {
  roomTypeInput.value = room.name;
  popup.style.display = "flex";
}

// ==== Đóng popup đặt phòng ====
closeBtn.addEventListener("click", () => (popup.style.display = "none"));
window.addEventListener("click", (e) => {
  if (e.target === popup) popup.style.display = "none";
});

// ==== Đóng popup thanh toán ====
closePayment.addEventListener("click", () => (paymentPopup.style.display = "none"));

// ==== Sự kiện Submit Form ====
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const fullname = document.getElementById("fullname").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const cccd = document.getElementById("cccd").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!fullname || !phone || !cccd || !email) {
    alert("⚠️ Vui lòng nhập đầy đủ thông tin!");
    return;
  }
  if (!/^\d{10}$/.test(phone)) {
    alert("⚠️ Số điện thoại không hợp lệ (phải 10 chữ số).");
    return;
  }
  if (!/^\d{12}$/.test(cccd)) {
    alert("⚠️ CCCD không hợp lệ (phải 12 chữ số).");
    return;
  }

  // Ẩn popup đặt phòng
  popup.style.display = "none";

  // Hiển thị popup thanh toán
  const payRoomName = document.getElementById("payRoomName");
  const payAmount = document.getElementById("payAmount");
  const selectedRoom = rooms.find((r) => r.name === roomTypeInput.value);

  payRoomName.textContent = roomTypeInput.value;
  payAmount.textContent = selectedRoom ? selectedRoom.price.toLocaleString("vi-VN") : "0";
  paymentPopup.style.display = "flex";
  

});



// ==== Khi người dùng nhấn "Tôi đã thanh toán" ====
btnDone.addEventListener("click", () => {
  paymentPopup.style.display = "none"; 

  // Hiện popup cảm ơn
  const thankPopup = document.getElementById("thankPopup");
  thankPopup.style.display = "flex";

});

// Nút đóng popup cảm ơn
document.getElementById("closeThank").addEventListener("click", () => {
  document.getElementById("thankPopup").style.display = "none";
});

// Khi nhấn nút "Đặt phòng ngay" trong header
document.getElementById("btnBookNow").addEventListener("click", () => {
  document.getElementById("bookingPopup").style.display = "flex";
});



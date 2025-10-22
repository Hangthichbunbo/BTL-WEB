document.addEventListener('DOMContentLoaded', () => {
    // Cuộn tới section khi click menu
    const items = document.querySelectorAll('.service-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            const id = item.getAttribute('data-target');
            const target = document.getElementById(id);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // === Slideshow SPA ===
    const slideShow = document.querySelector('#spa .slide-show');
    const list = document.querySelector('#spa .list-images');
    const slides = Array.from(document.querySelectorAll('#spa .slide-img'));
    const btnLeft = document.querySelector('#spa .btn-left');
    const btnRight = document.querySelector('#spa .btn-right');
    const dots = Array.from(document.querySelectorAll('#spa .index-item'));

    if (!slideShow || !list || slides.length === 0) return;

    let current = 0;
    const length = slides.length;

    function update() {
        const width = slideShow.clientWidth;
        list.style.transform = `translateX(${-width * current}px)`;
        dots.forEach(d => d.classList.remove('active'));
        const activeDot = document.querySelector(`#spa .index-item-${current}`);
        if (activeDot) activeDot.classList.add('active');
    }

    function next() {
        current = (current + 1) % length;
        update();
    }

    function prev() {
        current = (current - 1 + length) % length;
        update();
    }

    let intervalId = setInterval(next, 4000);

    if (btnRight) {
        btnRight.addEventListener('click', () => {
            clearInterval(intervalId);
            next();
            intervalId = setInterval(next, 4000);
        });
    }

    if (btnLeft) {
        btnLeft.addEventListener('click', () => {
            clearInterval(intervalId);
            prev();
            intervalId = setInterval(next, 4000);
        });
    }

    // Click vào chấm tròn
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            clearInterval(intervalId);
            current = idx;
            update();
            intervalId = setInterval(next, 4000);
        });
    });

    window.addEventListener('resize', update);
    update();
});

document.addEventListener('DOMContentLoaded', () => {
    // === Slideshow CONFERENCE ===
    const confShow = document.querySelector('#conference .slide-show');
    const confList = document.querySelector('#conference .list-images');
    const confSlides = Array.from(document.querySelectorAll('#conference .slide-img'));
    const confBtnLeft = document.querySelector('#conference .btn-left');
    const confBtnRight = document.querySelector('#conference .btn-right');
    const confDots = Array.from(document.querySelectorAll('#conference .index-item'));

    if (!confShow || !confList || confSlides.length === 0) return;

    let currentConf = 0;
    const confLength = confSlides.length;

    function updateConference() {
        const width = confShow.clientWidth;
        confList.style.transform = `translateX(${-width * currentConf}px)`;
        confDots.forEach(d => d.classList.remove('active'));
        const activeDot = document.querySelector(`#conference .index-item-${currentConf}`);
        if (activeDot) activeDot.classList.add('active');
    }

    function nextConference() {
        currentConf = (currentConf + 1) % confLength;
        updateConference();
    }

    function prevConference() {
        currentConf = (currentConf - 1 + confLength) % confLength;
        updateConference();
    }

    let confInterval = setInterval(nextConference, 4000);

    if (confBtnRight) {
        confBtnRight.addEventListener('click', () => {
            clearInterval(confInterval);
            nextConference();
            confInterval = setInterval(nextConference, 4000);
        });
    }

    if (confBtnLeft) {
        confBtnLeft.addEventListener('click', () => {
            clearInterval(confInterval);
            prevConference();
            confInterval = setInterval(nextConference, 4000);
        });
    }

    confDots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            clearInterval(confInterval);
            currentConf = idx;
            updateConference();
            confInterval = setInterval(nextConference, 4000);
        });
    });

    window.addEventListener('resize', updateConference);
    updateConference();
});

document.addEventListener('DOMContentLoaded', () => {
    // Nút mở menu
    const menuBtn = document.querySelector('.js-menu-btn');
    const nav = document.querySelector('.js-nav');
    const navContainer = document.querySelector('.js-nav-container');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.add('open');
        });

        // Bấm ra ngoài để đóng menu
        nav.addEventListener('click', () => {
            nav.classList.remove('open');
        });

        // Ngăn chặn khi click bên trong menu
        navContainer.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
});



// ==== POPUP ĐẶT PHÒNG NGAY (phòng nghỉ) ====
document.addEventListener("DOMContentLoaded", () => {
  const popupRoom = document.getElementById("bookingPopup");
  const closeRoom = document.getElementById("closePopup");
  const formRoom = document.getElementById("bookingForm");
  const roomTypeInput = document.getElementById("roomType");
  const paymentPopup = document.getElementById("paymentPopup");
  const closePayment = document.getElementById("closePayment");
  const btnDone = document.getElementById("btnDone");
  const roomPriceDisplay = document.getElementById("roomPrice");

  const rooms = [
    { name: "PHÒNG DELUXE", price: 2.000000 },
    { name: "PHÒNG GRAND DELUXE", price: 2.400000 },
    { name: "PHÒNG PREMIER QUAD", price: 2.600000 },
    { name: "PHÒNG EXECUTIVE", price: 3.200000 },
    { name: "PHÒNG PARK VIEW EXECUTIVE", price: 4.200000 },
    { name: "PHÒNG EXECUTIVE SUITE", price: 5.600000 },
    { name: "PRESIDENTIAL SUITE", price: 12.000000 },
  ];

  // Tự động thêm loại phòng vào select
  rooms.forEach(room => {
    const option = document.createElement("option");
    option.value = room.name;
    option.textContent = room.name;
    roomTypeInput.appendChild(option);
  });

  // Khi chọn phòng → hiện giá
  roomTypeInput.addEventListener("change", () => {
    const selected = rooms.find(r => r.name === roomTypeInput.value);
    roomPriceDisplay.textContent = selected ? selected.price.toLocaleString("vi-VN") : "0";
  });

  // Nút mở popup
  const btnBookNow = document.getElementById("btnBookNow");
  if (btnBookNow) {
    btnBookNow.addEventListener("click", (e) => {
      e.preventDefault();
      popupRoom.style.display = "flex";
    });
  }

  // Đóng popup
  closeRoom?.addEventListener("click", () => popupRoom.style.display = "none");
  window.addEventListener("click", (e) => {
    if (e.target === popupRoom) popupRoom.style.display = "none";
  });
  closePayment?.addEventListener("click", () => paymentPopup.style.display = "none");

  // Gửi form
  formRoom.addEventListener("submit", (event) => {
    event.preventDefault();
    const roomSelected = roomTypeInput.value.trim();
    const fullname = document.getElementById("fullname").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const cccd = document.getElementById("cccd").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!roomSelected || !fullname || !phone || !cccd || !email) {
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

    // Hiện popup thanh toán
    popupRoom.style.display = "none";
    const payRoomName = document.getElementById("payRoomName");
    const payAmount = document.getElementById("payAmount");
    const selectedRoom = rooms.find((r) => r.name === roomTypeInput.value);
    payRoomName.textContent = roomTypeInput.value;
    payAmount.textContent = selectedRoom ? selectedRoom.price.toLocaleString("vi-VN") : "0";
    paymentPopup.style.display = "flex";
  });

  btnDone?.addEventListener("click", () => {
    paymentPopup.style.display = "none";
    document.getElementById("thankPopup").style.display = "flex";
  });

  document.getElementById("closeThank")?.addEventListener("click", () => {
    document.getElementById("thankPopup").style.display = "none";
  });
});


// ==== POPUP ĐẶT DỊCH VỤ (spa, nhà hàng, hội nghị, đưa đón) ====
document.addEventListener("DOMContentLoaded", () => {
  const popupService = document.getElementById("booking");
  const closeService = popupService.querySelector("#closePopup");
  const formService = popupService.querySelector("#bookingForm");
  const serviceSelect = popupService.querySelector("#roomType");
  const thankPopup = document.getElementById("thankPopup");

  function openServiceModal(serviceName) {
    popupService.classList.add("active");
    let found = false;
    for (let option of serviceSelect.options) {
      if (option.textContent.trim().toLowerCase() === serviceName.toLowerCase()) {
        option.selected = true;
        found = true;
        break;
      }
    }
    if (!found) {
      const newOption = new Option(serviceName, serviceName, true, true);
      serviceSelect.add(newOption);
    }
  }

  // Gắn sự kiện cho nút "Đặt dịch vụ"
  document.querySelectorAll(".service-book-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const article = btn.closest(".service-article, .service-article-video");
      const serviceName = article.querySelector("h2").textContent.trim();
      openServiceModal(serviceName);
    });
  });

  // Đóng popup
  closeService.addEventListener("click", () => popupService.classList.remove("active"));
  popupService.addEventListener("click", e => {
    if (e.target === popupService) popupService.classList.remove("active");
  });

  // Gửi form
  formService.addEventListener("submit", e => {
    e.preventDefault();
    const fullname = popupService.querySelector("#fullname").value.trim();
    const phone = popupService.querySelector("#phone").value.trim();
    const cccd = popupService.querySelector("#cccd").value.trim();
    const email = popupService.querySelector("#email").value.trim();

    if (!fullname || !phone || !cccd || !email) {
      alert("⚠️ Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("⚠️ Số điện thoại phải gồm 10 chữ số!");
      return;
    }
    if (!/^\d{12}$/.test(cccd)) {
      alert("⚠️ CCCD phải gồm 12 chữ số!");
      return;
    }

    formService.reset();
    popupService.classList.remove("active");
    thankPopup.style.display = "flex";
  });
});

const rooms = [
  { id:"dlx1", 
    name:"PHÒNG DELUXE", 
    type:"phong-don", 
    price:2000000, 
    capacity:2, 
    size:36, 
    image:"/customer/images/room/deluxe.webp", 
    desc:"Phòng Deluxe 36m² sáng sủa, rộng rãi, view công viên/ thành phố. Wifi, minibar, trà/cà phê và ấm đun. Phòng tắm 6m² có bồn tắm và thiết bị vệ sinh tự động." },
  { id:"gdx1", 
    name:"PHÒNG GRAND DELUXE", 
    type:"phong-don", 
    price:2400000, 
    capacity:2, 
    size:36, 
    image:"/customer/images/room/grand-deluxe.webp", 
    desc:"Grand Deluxe 36m² nâng cấp hiện đại, sofa cạnh cửa sổ. Wifi, minibar, trà/cà phê, điều hòa, TV LCD. Tắm 6m² có bồn tắm và thiết bị vệ sinh tự động." },
  { id:"pmq1", 
    name:"PHÒNG PREMIER QUAD", 
    type:"phong-doi", 
    price:2600000, 
    capacity:4, 
    size:36, 
    image:"/customer/images/room/premier-quad.webp", 
    desc:"Premier Quad 36m² cho tối đa 4 khách. Wifi, minibar, TV thông minh, trà/cà phê, ấm đun. Tắm 6m² có bồn tắm và thiết bị vệ sinh tự động." },
  { id:"exe1", 
    name:"PHÒNG EXECUTIVE", 
    type:"phong-don", 
    price:3200000, 
    capacity:2, 
    size:36, 
    image:"/customer/images/room/executive.webp", 
    desc:"Executive 36m² tầng cao (14–16), view đẹp. Nội thất sang trọng, wifi, minibar, trà/cà phê, TV LCD; tắm có bồn, vòi sen riêng, thiết bị vệ sinh tự động." },
  { id:"pkex1", 
    name:"PHÒNG PARK VIEW EXECUTIVE", 
    type:"phong-don", 
    price:4200000, 
    capacity:2, 
    size:48, 
    image:"/customer/images/room/park-executive.webp", 
    desc:"Park View Executive 48m², 2 cửa sổ nhìn công viên/thành phố. Sofa, minibar, wifi, TV LCD; tắm 7,3m² có bồn và vòi sen riêng, thiết bị vệ sinh tự động." },
  { id:"exs1", 
    name:"PHÒNG EXECUTIVE SUITE", 
    type:"phong-don", 
    price:5600000, 
    capacity:3, 
    size:75, 
    image:"/customer/images/room/executive-suite.webp", 
    desc:"Executive Suite 75m² gồm phòng khách riêng. Wifi, minibar, trà/cà phê, TV LCD; tắm 11m² có bồn và buồng tắm riêng, thiết bị vệ sinh tự động." },
  { id:"prs1", 
    name:"PRESIDENTIAL SUITE", 
    type:"phong-don", 
    price:12000000, 
    capacity:4, size:123, 
    image:"/customer/images/room/presidential-suite.webp", 
    desc:"Presidential Suite 123m²: phòng ngủ, khách, bếp, ăn riêng. Wifi, minibar, máy pha cà phê, TV đôi; tắm có bồn, buồng tắm riêng, thiết bị vệ sinh tự động." }
];
const grid = document.getElementById("rooms-grid");
const elPrice = document.getElementById("f-maxprice");
const elGuests = document.getElementById("f-guests");
const elType = document.getElementById("f-type");
const btnReset = document.getElementById("f-reset");
function render(list){
  grid.innerHTML = list.map(r => `
    <article class="room-card">
      <div class="room-card__media">
        <img class="room-card__img" src="${r.image}" alt="${r.name}" loading="lazy">
        <span class="room-card__price">${r.price.toLocaleString('vi-VN')} đ</span>
      </div>
      <h4 class="room-card__name">${r.name}</h4>
      <p class="room-card__desc">${r.desc}</p>
      <button class="btn room-card__btn" data-id="${r.id}">Đặt phòng</button>
    </article>
  `).join("")
  grid.querySelectorAll(".room-card__btn").forEach(btn=>{
    btn.addEventListener("click",(e)=>{
      const id = e.currentTarget.dataset.id
      const room = rooms.find(x=>x.id===id)
      openModal(room);
    })
  })
}

function applyFilters(){
  const maxPrice = elPrice.value.trim()==="" ? Infinity : Number(elPrice.value);
  const guests = elGuests.value.trim()==="" ? 0 : Number(elGuests.value);
  const type = elType.value;
  const list = rooms.filter(r =>
    r.price <= maxPrice &&
    (!guests || r.capacity >= guests) &&
    (!type || r.type === type)
  );
  render(list);
}
function resetFilters(){
  elPrice.value = "";
  elGuests.value = "";
  elType.value = "";
  applyFilters();
}
[elPrice, elGuests].forEach(el => el && el.addEventListener("input", applyFilters));
elType && elType.addEventListener("change", applyFilters);
btnReset && btnReset.addEventListener("click", resetFilters);
const track = document.getElementById("carousel-track");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsWrap = document.getElementById("carousel-dots");
let slideIndex = 0;
const slides = track ? Array.from(track.querySelectorAll(".carousel__slide")) : [];
const total = slides.length;
function setActive(i){
  slides.forEach((s,k)=> s.classList.toggle("is-active", k===i));
  dotsWrap.querySelectorAll("button").forEach((d,k)=> d.classList.toggle("is-active", k===i));
}
function goTo(i){
  if(!total) return;
  slideIndex = (i+total)%total;
  setActive(slideIndex);
}
function next(){
  goTo(slideIndex+1);
}
function prev(){
  goTo(slideIndex-1);
}
if(dotsWrap && total){
  dotsWrap.innerHTML = "";
  for(let i=0;i<total;i++){
    const dot = document.createElement("button");
    if(i===0) dot.classList.add("is-active");
    dot.addEventListener("click", ()=>{ stop(); goTo(i); start(); });
    dotsWrap.appendChild(dot);
  }
}
const AUTOPLAY_MS = 3000;
let timer = null;
function start(){
  stop();
  timer = setInterval(next, AUTOPLAY_MS);
}
function stop(){
  if(timer) clearInterval(timer);
  timer = null;
}
if(track){
  start();
  track.addEventListener("mouseenter", stop);
  track.addEventListener("mouseleave", start);
}
nextBtn && nextBtn.addEventListener("click", ()=>{ stop(); next(); start(); });
prevBtn && prevBtn.addEventListener("click", ()=>{ stop(); prev(); start(); });
(function(){
  const btn = document.querySelector(".js-menu-btn");
  const menu = document.querySelector(".header-menu");
  if(!btn || !menu) return;
  btn.addEventListener("click", ()=> menu.classList.toggle("is-open"));
})();
render(rooms);
if(total) setActive(0);





// ==== Modal đặt phòng ====
const popup = document.getElementById("bookingPopup");
const closeBtn = document.getElementById("closePopup");
const form = document.getElementById("bookingForm");
const roomTypeInput = document.getElementById("roomType");
const room = [
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
grid.querySelectorAll(".room-card__btn").forEach(btn=>{
  btn.addEventListener("click",(e)=>{
    const id = e.currentTarget.dataset.id
    const room = rooms.find(x=>x.id===id)
    openModal(room);
  })
});

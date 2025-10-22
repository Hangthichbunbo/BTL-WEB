//---HOME---//
function setName() {
    var name = localStorage.getItem("loggedUser");
    if (name && document.getElementById("name")) {
        document.getElementById("name").innerHTML = name;
    }
}

// --- CHUYỂN SECTION --- //
function showSection(id) {
    document.querySelectorAll("section").forEach((s) => s.classList.add("hidden"));
    const section = document.getElementById(id);
    if (section) section.classList.remove("hidden");

    document.querySelectorAll("nav button").forEach((b) => b.classList.remove("active"));
    const btn = document.querySelector(`nav button[data-section="${id}"]`);
    if (btn) btn.classList.add("active");
}

// --- XỬ LÝ CLICK --- //
function handleClick(btn, type) {
    btn.classList.toggle("active");

    if (btn.classList.contains("active")) {
        if (type === "traPhong") {
            btn.innerText = "Đã trả phòng ✅";
            btn.disabled = true;
        } 
        else if (type === "donDep") {
            btn.innerText = "Đã dọn dẹp ✅";
            btn.disabled = true;
        }
        else if (type === "thanhToan") {
            btn.innerText = "Đã thanh toán ✅";
            btn.disabled = true;
        } 
        else {
            btn.innerText = "Đã xác nhận ✅";
            btn.disabled = true;
        }
    } 
    else {
        if (type === "traPhong") {
            btn.innerText = "Trả phòng";
        } 
        else if (type === "donDep") {
            btn.innerText = "Dọn dẹp";
        } 
        else if (type === "thanhToan") {
            btn.innerText = "Thanh toán";
        } 
        else {
            btn.innerText = "Xác nhận";
        }
    }
}

// --- SAVE --- //
function saveData() {
    alert("✅ Dữ liệu trạng thái đã được lưu thành công");
}

//_________________________________________________________________________
// --- ĐỌC FILE EXCEL VÀ HIỂN THỊ LÊN TABLE --- //
async function readExcelAndDisplay() {
    // Đọc file Excel cố định từ thư mục data
    const response = await fetch("../assets/data.xlsx");
    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);

    // Đọc workbook từ dữ liệu
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0]; // 👉 đổi số nếu muốn sheet khác
    const worksheet = workbook.Sheets[sheetName];
    // Chuyển dữ liệu sheet thành JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

    // Hiển thị ra bảng HTML
    checkRoom("sheet1", jsonData); 
    // nút chuyển trang
    document.getElementById("prevPage").onclick = function() { prevRoomPage(jsonData); };
    document.getElementById("nextPage").onclick = function() { nextRoomPage(jsonData); };

    renderTable("sheet2", jsonData);
    renderTable("sheet3", jsonData);
    renderTable("sheet4", jsonData);
    renderTable("sheet5", jsonData);
    renderTable("sheet6", jsonData);
    console.log(`✅ Đã đọc sheet: ${sheetName}, ${jsonData.length} dòng`);
}

function checkRoom(tableId, jsonData) {
    const table = document.getElementById(tableId);
    if (!jsonData || !jsonData.length) {
        table.innerHTML = "<tr><td>Không có dữ liệu</td></tr>";
        return;
    }

    // Vị trí cột 
    let locationCol;
    if (tableId === "sheet1") {
        locationCol = [0, 2];
    }

    // --- Body ---
    let bodyRows = "<tbody><tr>";
    const roomsPerRow = 5; // mỗi hàng 5 phòng

    // Lấy phạm vi phòng theo trang hiện tại
    const { start, end } = roomPages[currentPage];

    // --- Duyệt từng phòng ---
    for (let room = start; room <= end; room++) {
        let matched = null;

        // 🔍 Tìm dòng có mã phòng khớp
        for (let i = 0; i < jsonData.length; i++) {
            const row = jsonData[i];
            const values = Object.values(row);
            if (values[locationCol[0]] == room) {
                matched = row;
                break;
            }
        }

        // --- Xác định trạng thái ---
        let status = "";
        if (matched) {
            if (matched["Trạng thái"]) {
                status = matched["Trạng thái"];
            } else if (matched["Status"]) {
                status = matched["Status"];
            } else {
                status = "Đang sử dụng";
            }
        } else {
            status = "Trống";
        }

        // --- Lấy tên khách nếu đang sử dụng ---
        let guestName = "";
        if (matched && status.toLowerCase().includes("đang sử dụng")) {
            const values = Object.values(matched);
            guestName = values[locationCol[1]] || "";
        }

        // --- Màu theo trạng thái ---
        let color = "#ccc";
        const s = status.toLowerCase();
        if (s.includes("trống")) color = "#bcbcafff";
        else if (s.includes("đang sử dụng")) color = "#9FE2BF";
        else if (s.includes("bảo trì")) color = "#B0C4DE";

        // --- Tạo ô ---
        bodyRows += `
            <td style="background:${color};">
                <b>${room}</b><br>
                <span style="font-size:13px;">${status}</span><br>
                <span style="font-size:12px; color:#222;"><strong>${guestName}</strong></span>
            </td>
        `;

        // --- Xuống hàng sau mỗi 5 phòng ---
        if ((room - start + 1) % roomsPerRow === 0) {
            bodyRows += "</tr><tr>";
        }
    }

    bodyRows += "</tr></tbody>";
    table.innerHTML = bodyRows ;
}

// Render dữ liệu ra bảng HTML
function renderTable(tableId, jsonData) {
    const table = document.getElementById(tableId);
    if (!jsonData.length) {
        table.innerHTML = "<tr><td>Không có dữ liệu</td></tr>";
        return;
    }
    //vị trí cột
    let locationCol;
    if(tableId == "sheet1"){
        locationCol = [1, 2];
    }
    if(tableId == "sheet2"){
        locationCol = [1, 2, 3];
    }
    if(tableId == "sheet3"){
        locationCol = [2, 5, 6];
    }
    if(tableId == "sheet4"){
        locationCol = [2, 7, 8];
    }
    if(tableId == "sheet5"){
        locationCol = [2, 9, 10, 11];
    }
    if(tableId == "sheet6"){
        locationCol = [2, 1, 5, 7, 9];
    }
    
    // Header
    let headerRow = "<thead><tr>";
    const keys = Object.keys(jsonData[0]);
    for (let i = 0; i < locationCol.length; i++) {
        headerRow += `<th>${keys[locationCol[i]]}</th>`;
    }
    if(tableId != "sheet6"){
        headerRow += `<th>Trạng thái</th>`;
    }
    else headerRow += `<th>Thanh toán</th>`;
    headerRow += "</tr></thead>";   

    // Body
    let bodyRows = "<tbody>";
    for (let i = 0; i < jsonData.length; i++) {
        const row = jsonData[i];
        const values = Object.values(row);

        // Kiểm tra data trống
        if(tableId == "sheet4"){
            if(!values[7]) continue;
        }
        if(tableId == "sheet5"){
            if(!values[9]) continue;
        }

        bodyRows += "<tr>";
        for (let j = 0; j < locationCol.length; j++) {
            bodyRows += `<td>${values[locationCol[j]]}</td>`;
        }
        if(tableId != "sheet6"){
            bodyRows += `<td><button onclick="handleClick(this, '')">Xác nhận</button></td>`;
        }
        else bodyRows += `<td><button onclick="payNow(this), handleClick(this, 'thanhToan')" id = "thanhToan" >Thanh toán</button></td>`;
        bodyRows += "</tr>";
    }
    bodyRows += "</tbody>";
    table.innerHTML = headerRow + bodyRows;
}

//_________________________________________________________________________
//---PAYMENT---
function payNow(btn) {
    const row = btn.closest("tr");
    let name = row.cells[0].innerText; // cột đầu là tên
    let room = row.cells[1].innerText; // cột thứ 2 là phòng
    let restaurant = row.cells[2].innerText;
    let spa = row.cells[3].innerText;
    let car = row.cells[4].innerText;

    if(restaurant == "") restaurant = "Không dùng dịch vụ";
    if(spa == "") spa = "Không dùng dịch vụ";
    if(car == "") car = "Không dùng dịch vụ";

    openPaymentTab(name, room, restaurant, spa, car);
    handleClick(btn, "thanhToan");
}

function openPaymentTab(name, room, restaurant, spa, car) {
    // nội dung mã QR
    const qrData = `Tên khách: ${name}\nPhòng: ${room}\nĂn uống: ${restaurant}\nSpa: ${spa}\nĐưa đón: ${car}`;
    // Mở tab mới
    const newTab = window.open("", "_blank");
    // Ghi nội dung HTML
    newTab.document.writeln(`
        <!DOCTYPE html>
        <html lang="vi">
        <head>
        <meta charset="UTF-8">
        <title>Mã QR Thanh Toán</title>
        <link rel="stylesheet" href="../styles/style_pay.css">
       
        </head>
        <body>
            <div class="container">
                <div class="info">
                    <h2>Thanh toán cho khách</h2>
                    <p><b>Tên:</b> ${name}</p>
                    <p><b>Phòng:</b> ${room}</p>
                    <p><b>Ăn uống:</b> ${restaurant}</p>
                    <p><b>Spa:</b> ${spa}</p>
                    <p><b>Đưa đón tận nơi:</b> ${car}</p>

                </div>

                <div class="qr-section">
                    <img src="../images/VNPay.webp" class="logo" alt="VNPay Logo">
                    <canvas id="qrCanvas"></canvas>
                    <p class="note">Dùng ứng dụng ngân hàng hoặc VNPay để quét mã (demo - chỉ chứa text).</p>
                </div>
            </div>
        </body>
        </html>

    `);
    newTab.document.close();

    // script tạo QR offline
    newTab.onload = function() {
        const script = newTab.document.createElement("script");
        script.src = "../assets/qrcode.min.js";
        script.onload = function() {
            const canvas = newTab.document.getElementById("qrCanvas");
            if (newTab.QRCode && newTab.QRCode.toCanvas) {
                // Sử dụng API toCanvas để vẽ mã QR
                newTab.QRCode.toCanvas(canvas, qrData, { width: 220 }, function (error) {
                    if (error) {
                        console.error("Lỗi tạo QR:", error);
                        canvas.outerHTML = "<p style='color:red;'>Không thể tạo mã QR!</p>";
                    }
                });
            } else {
                // fallback nếu thư viện không có toCanvas
                const ctx = canvas.getContext("2d");
                ctx.font = "16px Arial";
                ctx.fillText("Không tìm thấy hàm QRCode.toCanvas()", 10, 50);
            }
        };
        newTab.document.body.appendChild(script);
    };
}


//_________________________________________________________________________
// --- PHÂN TRANG TRẠNG THÁI PHÒNG --- //
let currentPage = 0; 
const roomPages = [
    { start: 201, end: 210 },
    { start: 301, end: 310 }
];

// chuyển sang trang trước
function prevRoomPage(jsonData) {
    if (currentPage > 0) {
        currentPage--;
        checkRoom("sheet1", jsonData);
    }
}

// chuyển sang trang kế tiếp
function nextRoomPage(jsonData) {
    if (currentPage < roomPages.length - 1) {
        currentPage++;
        checkRoom("sheet1", jsonData);
    }
}


//_________________________________________________________________________
// --- KHI TRANG LOAD --- //
window.onload = function() {
    setName();
    showSection("room-status");
    readExcelAndDisplay();
};

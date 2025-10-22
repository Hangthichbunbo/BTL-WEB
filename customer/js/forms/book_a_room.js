document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("bookingForm");

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const roomType = document.getElementById("roomType").value;
            const checkin = document.getElementById("checkin").value;
            const checkout = document.getElementById("checkout").value;
            const adults = document.getElementById("adults").value;
            const children = document.getElementById("children").value;
            const fullname = document.getElementById("fullname").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const cccd = document.getElementById("cccd").value.trim();
            const email = document.getElementById("email").value.trim();
            const note = document.getElementById("note").value.trim();

            let errorMessage = "";

            if (!roomType) {
                errorMessage += "Vui lòng chọn loại phòng.\n";
            }
            if (!checkin) {
                errorMessage += "Vui lòng chọn ngày nhận phòng.\n";
            }
            if (!checkout) {
                errorMessage += "Vui lòng chọn ngày trả phòng.\n";
            }
            if (!fullname) {
                errorMessage += "Vui lòng nhập họ và tên.\n";
            }
            if (!phone || !/^\d{10}$/.test(phone)) {
                errorMessage += "Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại 10 chữ số.\n";
            }
            if (!cccd || !/^\d{12}$/.test(cccd)) {
                errorMessage += "CCCD không hợp lệ. Vui lòng nhập CCCD 12 chữ số.\n";
            }
            if (!email || !/\S+@\S+\.\S+/.test(email)) {
                errorMessage += "Email không hợp lệ. Vui lòng nhập email đúng định dạng.\n";
            }

            if (errorMessage) {
                alert("Lỗi:\n" + errorMessage);
                return;
            }

            alert("✅ Đặt phòng thành công!");

            form.reset();
        });
    } else {
        console.error("Không tìm thấy form với id 'bookingForm'");
    }
});

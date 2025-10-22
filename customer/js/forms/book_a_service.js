document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("serviceForm");

    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Ngừng hành động mặc định của form

            // Lấy giá trị từ các trường trong form
            const service = form.querySelector("select").value;
            const fullname = form.querySelector("input[type='text']").value.trim();
            const phone = form.querySelector("input[type='tel']").value.trim();
            const email = form.querySelector("input[type='email']").value.trim();
            const date = form.querySelector("input[type='date']").value;
            const time = form.querySelector("input[type='time']").value;
            const guests = form.querySelector("input[type='number']").value;
            const note = form.querySelector("textarea").value.trim();

            let errorMessage = "";

            // Kiểm tra từng trường
            if (!service) {
                errorMessage += "Vui lòng chọn dịch vụ.\n";
            }
            if (!fullname) {
                errorMessage += "Vui lòng nhập họ và tên.\n";
            }
            if (!phone || !/^\d{10}$/.test(phone)) {
                errorMessage += "Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại 10 chữ số.\n";
            }
            if (!email || !/\S+@\S+\.\S+/.test(email)) {
                errorMessage += "Email không hợp lệ. Vui lòng nhập email đúng định dạng.\n";
            }
            if (!date) {
                errorMessage += "Vui lòng chọn ngày.\n";
            }
            if (!time) {
                errorMessage += "Vui lòng chọn giờ.\n";
            }
            if (!guests || guests < 1) {
                errorMessage += "Số lượng khách không hợp lệ. Vui lòng nhập số lượng khách.\n";
            }

            // Nếu có lỗi, hiển thị thông báo lỗi
            if (errorMessage) {
                alert("Lỗi:\n" + errorMessage);
                return;
            }

            // Nếu không có lỗi, thông báo thành công
            alert("✅ Đặt dịch vụ thành công!");

            // Reset form sau khi gửi thành công
            form.reset();
        });
    } else {
        console.error("Không tìm thấy form với id 'serviceForm'");
    }
});

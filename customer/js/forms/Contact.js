document.addEventListener("DOMContentLoaded", function () {
  let form = document.getElementById("contactForm");
  let name = document.getElementById("name");
  let phone = document.getElementById("tel");
  let note = document.getElementById("note");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let message = "";

    if (name.value.trim() === "" || phone.value.trim() === "") {
      message += "Vui lòng nhập đầy đủ họ tên và số điện thoại.\n";
    }

    if (name.value.trim() !== "" && name.value.trim().split(" ").length < 2) {
      message += "Họ tên phải có ít nhất 2 từ.\n";
    }

    const phoneRegex = /^(0|\+84)[0-9]{9}$/;
    if (phone.value.trim() !== "" && !phoneRegex.test(phone.value.trim())) {
      message += "Số điện thoại không đúng định dạng (VD: 0912345678 hoặc +84912345678).\n";
    }

    if (message !== "") {
      alert(message);
    } else {
      alert(
        `Gửi thành công!\n\nHọ tên: ${name.value}\nSĐT: ${phone.value}\nGhi chú: ${note.value || "(Không có)"}`
      );
      form.reset();
    }
  });
});

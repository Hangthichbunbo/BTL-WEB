document.addEventListener("DOMContentLoaded", function() {
    let form = document.getElementById("loginForm");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            let username = form.username;
            let password = form.password;

            if (checknull(username)) {
                alert("⚠️Tên tài khoản không được để trống!");
                username.focus();
                return;
            }

            if (maxText(username)) {
                alert("❌Sử dụng tài khoản hợp lệ (dưới 10 ký tự)!");
                username.focus();
                return;
            }

            if (checknull(password)) {
                alert("⚠️Mật khẩu không được để trống!");
                password.focus();
                return;
            }
            if (!/^[A-Za-z0-9]+$/.test(password.value)) {
                alert("❌Mật khẩu chỉ được chứa chữ và số!");
                password.focus();
                return;
            }
            localStorage.setItem("loggedUser", username.value);
            alert("✅Đăng nhập thành công!");
            window.location.href = "home.html";
        });
    }
});

function checknull(txt) {
    return txt.value.trim().length === 0;
}

function maxText(txt) {
    return txt.value.trim().length >= 10;
}

// --- HIỆN / ẨN MẬT KHẨU --- //
function togglePassword() {
    const passInput = document.getElementById("password");
    const icon = document.querySelector(".toggle-password");
    if (!passInput || !icon) return;

    if (passInput.type === "password") {
        passInput.type = "text";
        icon.textContent = "🙉";
    } else {
        passInput.type = "password";
        icon.textContent = "🙈";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(loginForm);

        fetch("/auth/login", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url;  // Redirige al usuario a su panel correspondiente
            } else {
                return response.json();
            }
        })
        .then(data => {
            if (data && data.error) {
                loginError.style.display = "block";
                loginError.querySelector(".flash.error").textContent = data.error;
            }
        })
        .catch(error => console.error("Error:", error));
    });
});

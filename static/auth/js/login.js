document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar recarga de la página

        const formData = new FormData(loginForm);

        fetch("/auth/login", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Si la respuesta es 200 OK, procesamos JSON
            } else {
                throw new Error("Usuario o contraseña incorrectos."); // Lanzamos error si no es 200
            }
        })
        .then(data => {
            if (data.success) {
                window.location.href = data.redirect_url; // Redirigir al usuario a su panel
            }
        })
        .catch(error => {
            // Mostrar alerta con el error
            alert(`⚠️ ${error.message}`);

            // También mostrar el mensaje en la interfaz si es necesario
            loginError.style.display = "block";
            loginError.querySelector(".flash.error").textContent = error.message;
        });
    });
});

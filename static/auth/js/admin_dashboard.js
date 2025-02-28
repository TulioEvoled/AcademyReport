document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("edit-user-modal");
    const closeModal = document.querySelector(".close");
    const editForm = document.getElementById("edit-user-form");

    // Abrir el modal con datos del usuario
    document.querySelectorAll(".edit-button").forEach(button => {
        button.addEventListener("click", function () {
            document.getElementById("edit-id").value = this.dataset.id;
            document.getElementById("edit-nombre").value = this.dataset.nombre;
            document.getElementById("edit-usuario").value = this.dataset.usuario;
            document.getElementById("edit-cargo").value = this.dataset.cargo;
            
            // Configurar la acción del formulario dinámicamente
            editForm.setAttribute("action", `/auth/edit_user/${this.dataset.usuario}`);

            modal.style.display = "block";
        });
    });

    // Cerrar el modal al hacer clic en el botón de cerrar
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Cerrar el modal si el usuario hace clic fuera de él
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Enviar el formulario de edición de usuario
    editForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const formData = new FormData(editForm);
        const userId = document.getElementById("edit-id").value;

        fetch(editForm.getAttribute("action"), { // URL configurada dinámicamente
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la actualización");
            }
            return response.json();
        })
        .then(data => {
            alert(data.msg);
            location.reload();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Hubo un error al actualizar el usuario");
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const popup = document.querySelector(".popup");
    const button = document.querySelectorAll("[href='#popup']");
    const closeButton = document.querySelector(".popup__close");

    button.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            popup.classList.add("active");
        })
    });

    closeButton.addEventListener("click", () => {
        popup.classList.remove("active");
    });

    window.onclick = (e) => {
        if (e.target === popup) {
            popup.classList.remove("active");
        }
    };
});
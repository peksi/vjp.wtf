const modalButtons = document.querySelectorAll(".modal-button");
const modals = document.querySelectorAll(".modal");
const modalsArray = [...modals];
const modalContainer = document.querySelector("#modal-container");

modalButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modalNumber = button.dataset.modal;
        const modal = modalsArray.find(
            (modal) => modal.dataset.modal === modalNumber
        );
        modal.style.display = "block";
        modalContainer.style.display = "flex";
    });
});

const closeButtons = document.querySelectorAll(".modal-close");

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        button.parentElement.style.display = "none";
        modalContainer.style.display = "none";
    });
})
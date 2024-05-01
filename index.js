
const modalBack = document.querySelector(".modal-back");
const modalActive = document.querySelector(".modal-active");
const plus = document.querySelector("#plus");
const cross = document.querySelector(".cross");
const form = document.querySelector(".form");
const btn = document.querySelector("#btn");

function add() {
    modalBack.style.display = "block";
    modalActive.style.display = "block";
}

function close() {
    modalBack.style.display = "none";
    modalActive.style.display = "none";
}

plus.addEventListener("click", add)
cross.addEventListener("click", close)

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const urlInput = e.target.elements.url;
    console.log(urlInput.value);
    close(); 
});
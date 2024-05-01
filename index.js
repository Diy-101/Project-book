
const modalBack = document.querySelector(".modal-back");
const modalActive = document.querySelector(".modal-active");
const plus = document.querySelector("#plus");
const cross = document.querySelector(".cross");
const form = document.querySelector(".form");
const btn = document.querySelector("#btn");
const books = document.querySelector(".books");


function clear(e) {
    e.target.elements.url.value = "";
    e.target.elements.author.value= "";
    e.target.elements.title.value = "";
    e.target.elements.pages.value = "";
    e.target.elements.state.value = "";
}

function addBook(data) {
    const newBook = document.createElement("div");
    newBook.className = 'book';
    books.insertBefore(newBook, plus);

    const newImg = document.createElement('img');
    newImg.className = 'cover';
    newImg.src = `${data.url}`;
    newBook.appendChild(newImg);

    const title = document.createElement('p');
    title.textContent = `${data.title}`
    newBook.appendChild(title);
}

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

    const dataBook = {
        url: e.target.elements.url.value,
        author: e.target.elements.author.value,
        title: e.target.elements.title.value,
        pages: e.target.elements.pages.value,
        state: e.target.elements.state.value,
    }

    addBook(dataBook)
    
    console.log(dataBook);
    clear(e);
    close(); 
});


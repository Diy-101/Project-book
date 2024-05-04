const modalBack = document.querySelector(".modal-back");
const modalActive = document.querySelector(".modal-active");
const plus = document.querySelector("#plus");
const cross = document.querySelector(".cross");
const form = document.querySelector(".form");
const btn = document.querySelector("#btn");
const books = document.querySelector(".books");
const headAdd = document.querySelector(".headAdd");
let booksArray = document.querySelectorAll(`.book`);
const myLibrary = {};
let k = 0;
let states = document.querySelectorAll(`.stateButton`);

function clear(e) {
  e.target.elements.url.value = "";
  e.target.elements.author.value = "";
  e.target.elements.title.value = "";
  e.target.elements.pages.value = "";
  e.target.elements.state.value = "";
}

function addBook(data) {
  const newBook = document.createElement("div");
  newBook.className = "book";
  books.insertBefore(newBook, plus);

  const newImg = document.createElement("img");
  newImg.className = "cover";
  newImg.src = `${data.url}`;
  newBook.appendChild(newImg);

  const info = document.createElement(`div`);
  info.className = "info";
  newBook.appendChild(info);

  const state = document.createElement(`div`);
  state.className = "state";
  info.appendChild(state);

  const stateText = document.createElement(`p`);
  stateText.textContent = `Status`;
  state.appendChild(stateText);

  const stateButton = document.createElement(`button`);
  stateButton.className = "stateButton";
  if (data.state === 1) {
    stateButton.style.backgroundColor = `green`;
  }
  state.appendChild(stateButton);

  const title = document.createElement("p");
  title.textContent = `${data.title}`;
  title.className = `title`;
  info.appendChild(title);

  const deleteBook = document.createElement(`button`);
  deleteBook.className = `deleteButton`;
  deleteBook.textContent = `Delete`;
  info.appendChild(deleteBook);

  newBook.setAttribute(`data`, `${k++}`);
  return;
}

function add() {
  modalBack.style.display = "block";
  modalActive.style.display = "block";
}

function close() {
  modalBack.style.display = "none";
  modalActive.style.display = "none";
}

plus.addEventListener("click", add);
cross.addEventListener("click", close);

headAdd.addEventListener("click", add);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const dataBook = {
    id: k,
    url: e.target.elements.url.value,
    author: e.target.elements.author.value,
    title: e.target.elements.title.value,
    pages: e.target.elements.pages.value,
    state: parseInt(e.target.elements.state.value),
  };

  myLibrary[k] = dataBook;
  addBook(dataBook);

  states = document.querySelectorAll(`.stateButton`);
  deletes = document.querySelectorAll(`.deleteButton`);

  states.forEach((item) => {
    item.onclick = () => {
      const parent = item.parentElement;
      const info = parent.parentElement;
      const book = info.parentElement;
      const bookobj = myLibrary[book.getAttribute(`data`)];

      if (item.style.background === "green") {
        item.style.background = `white`;
        bookobj.state = 0;
      } else {
        item.style.background = "green";
        bookobj.state = 1;
      }
    };
  });

  deletes.forEach((item) => {
    item.onclick = () => {
      const parent = item.parentElement;
      const book = parent.parentElement;
      delete myLibrary[book.getAttribute(`data`)];
      console.log(book);
      books.removeChild(book);
    };
  });

  clear(e);
  close();
});

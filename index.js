class Varibles {
  radio = document.querySelector(".radioread")
  modalBack = document.querySelector(".modal-back");
  modalActive = document.querySelector(".modal-active");
  plus = document.querySelector("#plus");
  cross = document.querySelector(".cross");
  form = document.querySelector(".form");
  btn = document.querySelector("#btn");
  books = document.querySelector(".books");
  headAdd = document.querySelector(".headAdd");
  booksArray = document.querySelectorAll(`.book`);
  myLibrary = {};
  k = 0;
  states = document.querySelectorAll(`.stateButton`);
}

const varibles = new Varibles();

class FunctionsForBooks {

  createElementOwn(element, nameOfClass="", parent, text="") {
    const part = document.createElement(element);

    if (nameOfClass) 
      part.className = nameOfClass;

    if (parent === varibles.books) {
      varibles.books.insertBefore(part, varibles.plus);
    } else {
      parent.appendChild(part);
    }

    if (text) {
      part.textContent = text;
    }


    return part;
  }

  addBook(data) {
    varibles.myLibrary[varibles.k] = data;

    const newBook = this.createElementOwn("div", "book", varibles.books);

    const newImg = this.createElementOwn("img", "cover", newBook);
    newImg.src = `${data.url}`;

    const info = this.createElementOwn("div", "info", newBook);
    
    const state = this.createElementOwn("div", "state", info);
    
    const stateText = this.createElementOwn("p", "", state, "Status");
    
    const stateButton = this.createElementOwn("button", "stateButton", state);

    if (data.state === 1) {
      stateButton.style.backgroundColor = `green`;
    }
    
    const title = this.createElementOwn("p", "title", info, `${data.title}`);
    
    const deleteBook = this.createElementOwn("button", "deleteButton", info, "Delete");
  
    newBook.setAttribute(`data`, `${varibles.k++}`);
    return;
  }
}



class InteractWithForm extends FunctionsForBooks {

  add() {
    varibles.modalBack.style.display = "block";
    varibles.modalActive.style.display = "block";
  }

  close() {
    varibles.modalBack.style.display = "none";
    varibles.modalActive.style.display = "none";
  }

  clear(e) {
    e.target.elements.url.value = "";
    e.target.elements.author.value = "";
    e.target.elements.title.value = "";
    e.target.elements.pages.value = "";
    e.target.elements.state.value = "";
  }
  
  submition(e) {
    e.preventDefault();
    const dataBook = this.createData(e);
    console.log(dataBook)
    this.addBook(dataBook);
    this.buttons();
    this.clear(e);
    this.close();
  }

  createData(e) {
    console.log(e)
    const dataBook = {
      id: varibles.k,
      url: e.target.elements.url.value,
      author: e.target.elements.author.value,
      title: e.target.elements.title.value,
      pages: e.target.elements.pages.value,
      state: parseInt(e.target.elements.state.value),
    };

    return dataBook;
  }

  buttons() {
    const states = document.querySelectorAll(`.stateButton`);
    const deletes = document.querySelectorAll(`.deleteButton`);

    states.forEach((item) => {
      item.onclick = () => {
        const parent = item.parentElement;
        const info = parent.parentElement;
        const book = info.parentElement;
        const bookObj = varibles.myLibrary[book.getAttribute(`data`)];
  
        if (item.style.background === "green") {
          item.style.background = `white`;
          bookObj.state = 0;
        } else {
          item.style.background = "green";
          bookObj.state = 1;
        }
      };
    });
  
    deletes.forEach((item) => {
      item.onclick = () => {
        const parent = item.parentElement;
        const book = parent.parentElement;
        delete varibles.myLibrary[book.getAttribute(`data`)];
        console.log(book);
        varibles.books.removeChild(book);
      };
    });
  }
}

const interaction = new InteractWithForm();

varibles.plus.addEventListener("click", interaction.add);
varibles.cross.addEventListener("click", interaction.close);

varibles.headAdd.addEventListener("click", interaction.add);

varibles.form.addEventListener("submit", (e) => interaction.submition(e));

let myArray = [];
let count = 0;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        let answer = title + " by " + author + ", " + pages +" pages" + ", " ;
        if (read) {
            answer += "read";
        } else {
            answer += "not read yet";
        }
        return answer;
    }
}

function addBookToLibrary(arr, obj) {
    arr.push(obj);
}

const book1 = new Book("One Flew Over the Cuckoo's Nest", "Ken Kesey", "320", false);
const book2 = new Book("Lord of the Rings", "J. R. R. Tolkien", "1137", false);
const book3 = new Book("Ender's Game", "Orson Scott Card", "324", true);
const book4 = new Book("Speaker for the Dead", "Orson Scott Card", "415", true);
const book5 = new Book("Ready Player One", "Ernest Cline", "374", true);

addBookToLibrary(myArray, book1);
addBookToLibrary(myArray, book2);
addBookToLibrary(myArray, book3);
addBookToLibrary(myArray, book4);
addBookToLibrary(myArray, book5);

for (let book of myArray) {
    createCards(book);
}

function createCards (book) {
    const parentDiv = document.querySelector('.books');
    const divElem = document.createElement('div');
    divElem.classList.add("card");
    const bookName = document.createElement('h3');
    bookName.textContent = book.title;
    const bookAuthor = document.createElement('p');
    bookAuthor.textContent = book.author;
    const lastRowInCard = document.createElement('div');
    lastRowInCard.classList.add("lastRowInCard");
    const bookPages = document.createElement('p');
    bookPages.classList.add("pages");
    bookPages.textContent = book.pages + " p";
    const bookRead = document.createElement('input');
    bookRead.setAttribute("type", "checkbox");
    bookRead.classList.add("checkbox");
    if (book.read) {
        bookRead.setAttribute("checked", true);
    }
    const btnRemove = document.createElement('button');
    btnRemove.textContent = "Remove";
    btnRemove.classList.add("value" + count);
    btnRemove.addEventListener('click', function(){removeThis(this.classList.value)});
    divElem.appendChild(bookName);
    divElem.appendChild(bookAuthor);
    lastRowInCard.appendChild(bookPages);
    lastRowInCard.appendChild(bookRead);
    divElem.appendChild(lastRowInCard);
    divElem.appendChild(btnRemove);
    parentDiv.appendChild(divElem);
    count++;
}

const modal = document.querySelector('.modal');
const openModal = document.querySelector('.new-btn');
const span = document.querySelector('.close');
const submitBtn = document.querySelector('.addingBook');

const formTitle = document.querySelector('.bookTitle');
const formAuthor = document.querySelector('.bookAuthor');
const formPages = document.querySelector('.bookPages');
const formRead = document.querySelector('.bookRead');

openModal.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
    unsetFormValues();
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      unsetFormValues();
    }
}

submitBtn.onclick = function() {
    addingBooks();
    unsetFormValues();
}

formTitle.addEventListener('input', () => {
    manageInput(formTitle);
})

formAuthor.addEventListener('input', () => {
    manageInput(formAuthor);
})

function manageInput(elem) {
    if (elem.value.length === 1 && elem.value.match(/[a-z]/)) {
        elem.value = elem.value.toUpperCase();
    }
    if (elem.value) {
        elem.value = elem.value.match(/[a-z\-\s\']/ig).join("");
    }
}

function unsetFormValues() {
    formTitle.value = '';
    formAuthor.value = '';
    formPages.value = '';
    formRead.checked = false;
}

function addingBooks() {
    let readValue = false;
    if (formRead.checked) {
        readValue = true;
    }
    if (formTitle.value && formAuthor.value && formPages.value) {
        let book = new Book(formTitle.value, formAuthor.value, formPages.value, readValue);
        createCards(book);
    }
    modal.style.display = "none";
}

function removeThis(theClass) {
    const toDelete = document.querySelector('.' + theClass);
    toDelete.parentElement.remove();
}
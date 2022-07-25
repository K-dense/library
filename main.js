const addBookBtn = document.querySelector('.addBook');
const addBookForm = document.querySelector('.add-book-form_container');
const closeForm = document.querySelector('#close-form');
const table = document.querySelector('tbody');

const form  = document.querySelector('#book-form');
const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formPages = document.querySelector('#pages');
const formSubmit = document.querySelector('#submit');

let myLibrary = [];

// Constructor Function

class Book {
  constructor(title, author, numberPages) {
    this.title = title
    this.author = author
    this.pages = numberPages
  }

  log() {
    return `${this.title} by ${this.author}, ${this.pages} pages`
  }
}

// Push new book to myLibrary array
function addBookToLibrary(title, author, numPage) {
  const newBook = new Book(title, author, numPage);
  myLibrary.push(newBook);
}

// Create table row and data for new book added
function createTableRow() {
  const newTr = document.createElement('tr');
  const newTd = document.createElement('td');
  const currentRow = table.appendChild(newTr);

  currentRow.appendChild(newTd);
  currentRow.appendChild(newTd);
  currentRow.appendChild(newTd);
}

addBookBtn.addEventListener('click', e => {
  e.stopPropagation();
  addBookForm.classList.toggle('hidden')
})

closeForm.addEventListener('click', e => {
  e.stopPropagation();
  addBookForm.classList.toggle('hidden');
})

addBookForm.addEventListener('click', e => {
  e.stopPropagation();
})

document.body.addEventListener('click', () => {
  if (!addBookForm.classList.contains('hidden')) {
     addBookForm.classList.add('hidden');
  }
})

form.addEventListener('submit', () => {
  addBookToLibrary();
});
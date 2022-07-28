const addBookBtn = document.querySelector('.addBook');
const addBookForm = document.querySelector('.add-book-form_container');
const closeForm = document.querySelector('#close-form');
const table = document.querySelector('tbody');

const formSubmit = document.querySelector('#submit');

let myLibrary = [];

// Constructor Function

class Book {
  constructor(title, author, numberPages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = numberPages;
    this.isRead = isRead;
  }

  log() {
    return `${this.title} by ${this.author}, ${this.pages} pages`;
  }
}

class Library {
  constructor() {
    this.books = [];
  }
  addBook(newBook) {
    this.books.push(newBook);
    console.log(this.books);
  }

  deleteBook(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }
}

const library = new Library();

// Create table row and data for new book added
function createTableRow() {
  const buttonRead = document.createElement('button');
  const buttonRemove = document.createElement('button');

  buttonRead.innerText = 'Read';
  buttonRemove.innerText = 'Remove';

  const row = table.insertRow(1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  const cell4 = row.insertCell(3);
  const cell5 = row.insertCell(4);

  cell1.innerHTML = library.books[library.books.length - 1].title;
  cell2.innerHTML = library.books[library.books.length - 1].author;
  cell3.innerHTML = library.books[library.books.length - 1].pages;
  cell4.appendChild(buttonRead);
  cell5.appendChild(buttonRemove);

  buttonRemove.onclick = removeBook;
}

// Get a new book from User Input
function newBookFromInput() {
  const titleInput = document.getElementById('title').value;
  const authorInput = document.getElementById('author').value;
  const pagesInput = document.getElementById('pages').value;
  const radioButtons = document.querySelectorAll('input[name="is-read"]');

  let isReadInput;
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      isReadInput = radioButton.value;
    }
  }

  return new Book(titleInput, authorInput, pagesInput, isReadInput)
}

// Add new book from User Input to Library
function addBook() {
  const newBook = newBookFromInput()
  library.addBook(newBook);
}

// Handler functions

function toggleClass(e) {
  e.stopPropagation();
  addBookForm.classList.toggle('hidden');
}

function handler() {
  addBook();
  createTableRow();
  addBookForm.classList.toggle('hidden');
}

// Delete book from library

const removeBook = (e) => {
  const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
    '"',
    ''
  )
  library.deleteBook(title)
  console.log(library.books);
}

// Event Listeners
addBookBtn.addEventListener('click', toggleClass);
closeForm.addEventListener('click', toggleClass);

addBookForm.addEventListener('click', (e) => {
  e.stopPropagation();
});

document.body.addEventListener('click', () => {
  if (!addBookForm.classList.contains('hidden')) {
    addBookForm.classList.add('hidden');
  }
});

formSubmit.addEventListener('click', handler);

const addBookBtn = document.querySelector('.addBook');
const addBookForm = document.querySelector('.add-book-form_container');
const closeForm = document.querySelector('#close-form');
const table = document.querySelector('tbody');

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

  cell1.innerHTML = myLibrary[0].title;
  cell2.innerHTML = myLibrary[0].author;
  cell3.innerHTML = myLibrary[0].pages;
  cell4.appendChild(buttonRead);
  cell5.appendChild(buttonRemove);
}

// Push new book to myLibrary array
function addBookToLibrary(title, author, numPage) {
  const newBook = new Book(title, author, numPage);
  return myLibrary.unshift(newBook);
}

// Handler functions

function toggleClass(e) {
  e.stopPropagation();
  addBookForm.classList.toggle('hidden')
}

function handler() {
  let titleInput = document.getElementById('title');
  let titleOutput = titleInput.value;

  let authorInput = document.getElementById('author');
  let authorOutput = authorInput.value;

  let pagesInput = document.getElementById('pages');
  let pagesOutput = pagesInput.value;

  addBookToLibrary(titleOutput, authorOutput, pagesOutput);
  createTableRow();
  addBookForm.classList.toggle('hidden');
}

// Event Listeners
addBookBtn.addEventListener('click', toggleClass)
closeForm.addEventListener('click', toggleClass)

addBookForm.addEventListener('click', e => {
  e.stopPropagation();
})

document.body.addEventListener('click', () => {
  if (!addBookForm.classList.contains('hidden')) {
     addBookForm.classList.add('hidden');
  }
})

formSubmit.addEventListener('click', handler);
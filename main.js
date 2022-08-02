const addBookBtn = document.querySelector('.addBook');
const addBookForm = document.querySelector('.add-book-form_container');
const closeForm = document.querySelector('#close-form');
const table = document.getElementById('table');
const tableBody = document.querySelector('tbody');

const formSubmit = document.querySelector('#submit');

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

  isInLibrary(newBook) {
    return this.books.some((book) => book.title === newBook.title);
  }
}

const library = new Library();

const clearTable = () => {
  table.innerHTML = '';

  const row = table.insertRow(0);
  const th1 = document.createElement('th');
  const th2 = document.createElement('th');
  const th3 = document.createElement('th');
  row.appendChild(th1).innerHTML = 'Title';
  row.appendChild(th2).innerHTML = 'Author';
  row.appendChild(th3).innerHTML = 'Pages';
};

// Create table row and data for new book added
function createTableRow() {
  clearTable();

  for (let i = 0; i <= library.books.length - 1; i++) {
    const buttonRead = document.createElement('button');
    const buttonRemove = document.createElement('button');

    buttonRead.classList.add('button-read');
    if(library.books[i].isRead === 'Read') {
      buttonRead.classList.add('button-read-yes');
    } else {
      buttonRead.classList.add('button-read-no');
    }

    buttonRead.innerText = library.books[i].isRead;
    buttonRemove.innerText = 'Remove';
    
    const row = table.insertRow(1);
    let rowIndex = 0;
    row.insertCell(rowIndex++).innerHTML = library.books[i].title;
    row.insertCell(rowIndex++).innerHTML = library.books[i].author;
    row.insertCell(rowIndex++).innerHTML = library.books[i].pages;
    row.insertCell(rowIndex++).appendChild(buttonRead);
    row.insertCell(rowIndex++).appendChild(buttonRemove);

    buttonRead.addEventListener('click', () => {
      if (library.books[i].isRead === 'Read') {
        buttonRead.innerText = 'Not Read';
        buttonRead.classList.toggle('button-read-yes');
        buttonRead.classList.toggle('button-read-no');
        library.books[i].isRead = 'Not Read';
      } else {
        buttonRead.innerText = 'Read';
        buttonRead.classList.toggle('button-read-yes');
        buttonRead.classList.toggle('button-read-no');
        library.books[i].isRead = 'Read';
      }
    });
    buttonRemove.onclick = removeBook;
  }
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

  return new Book(titleInput, authorInput, pagesInput, isReadInput);
}

// Add new book from User Input to Library
function addBook() {
  const newBook = newBookFromInput();
  if (library.isInLibrary(newBook)) {
    return alert('This book is already in the library');
  }
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
  );
  library.deleteBook(title);
  clearTable();
  createTableRow();
};

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

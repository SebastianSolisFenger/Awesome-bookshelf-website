class BooksShelf {
  constructor() {
    if (localStorage.getItem("books") === null) {
      this.books = [];
      return;
    }
    this.books = JSON.parse(localStorage.getItem("books"));
  }

  addBook(book = null) {
    if (book === null) return;
    this.books.push(book);
    localStorage.setItem("books", JSON.stringify(this.books));
  }

  removeBook(bookIndex) {
    this.books = this.books.filter((item, index) => index !== bookIndex);
    localStorage.setItem("books", JSON.stringify(this.books));
  }
}

const booksContainer = document.getElementById("books-dynamic-container");
const addBookForm = document.getElementById("form-add-book");
const titleInput = document.getElementById("title-input");
const author = document.getElementById("author-input");
// eslint-disable-next-line no-unused-vars

const allAddedBooks = new BooksShelf();

function reload() {
  booksContainer.innerHTML = allAddedBooks.books
    .map(
      (
        bookItem,
        index
      ) => `<div class="book-item" style="border-bottom: 1px black solid;" ><p><strong>${bookItem.titleInput}<br>${bookItem.author}.</strong></p>
        <button onclick="removeBook(${index})">Remove</button>
        </div>`
    )
    .join("");
  if (allAddedBooks.books.length === 0) {
    booksContainer.style.cssText = "border: none;";
  } else {
    booksContainer.style.cssText = "border-bottom: 2px black solid;";
  }
}

reload();

addBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newBook = {
    titleInput: titleInput.value,
    author: author.value,
  };

  allAddedBooks.addBook(newBook);
  titleInput.value = "";
  author.value = "";
  reload();
});

// eslint-disable-next-line no-unused-vars
const removeBook = (bookIndex) => {
  allAddedBooks.removeBook(bookIndex);
  reload();
};

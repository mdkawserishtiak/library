// Test Data
// To Kill a Mockingbird, Harper Lee, 281
// The Great Gatsby, F. Scott Fitzgerald, 180
// 1984, George Orwell, 328
// Pride and Prejudice, Jane Austen, 279
// The Catcher in the Rye, J.D. Salinger, 234
// The Hobbit, J.R.R. Tolkien, 310
// Brave New World, Aldous Huxley, 268
// Fahrenheit 451, Ray Bradbury, 249
// Crime and Punishment, Fyodor Dostoevsky, 671
// The Alchemist, Paulo Coelho, 208

const library = [];

function Book(id, title, author, pages, isRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

const addBookToLibrary = (title, author, pages, isRead) => {
  const id = crypto.randomUUID();

  const book = new Book(id, title, author, pages, isRead);

  library.push(book);
};

const tableBody = document.querySelector("#table-body");

const displayBooks = (books) => {
  const bookRows = books
    .map((book) => {
      return `
        <tr class="odd:bg-gray-200/70">
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.pages}</td>
          <td>${book.isRead ? "Yes" : "No"}</td>
          <td>
            <button
                class="p-0! cursor-pointer transition-all hover:border-b-4 remove-book"
                data-id="${book.id}"
                >
                <img src="./icons/remove-book.png" width="50" height="50" />
              </button>
          </td>
        </tr>
      `;
    })
    .join("");

  const addBookRow = `
        <tr>
            <td colspan="5" class="p-0!">
                <button
                class="w-full flex items-center justify-center p-0! bg-black border-2 text-white font-bold tracking-widest uppercase cursor-pointer hover:bg-white hover:text-black transition-all"
                popovertarget="add-book-dialog"
                >
                <img src="./icons/add-book.png" width="50" height="50" />
                Add Book
                </button>
            </td>
        </tr>
    `;

  tableBody.innerHTML = bookRows + addBookRow;
};

// addBookToLibrary("To Kill a Mockingbird", "Harper Lee", "281", true);
// addBookToLibrary("1984", "George Orwell", "328", true);
// addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", "180", false);
// addBookToLibrary("Pride and Prejudice", "Jane Austen", "279", true);
// addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", "234", false);
// addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "310", true);
// addBookToLibrary("Brave New World", "Aldous Huxley", "268", false);
// addBookToLibrary("Fahrenheit 451", "Ray Bradbury", "249", true);
// addBookToLibrary("Crime and Punishment", "Fyodor Dostoevsky", "671", false);
// addBookToLibrary("The Alchemist", "Paulo Coelho", "208", true);

// displayBooks(library);

const addBookButton = document.querySelector("#add-book-button");
const addBookDialog = document.querySelector("#add-book-dialog");

addBookButton.addEventListener("click", (event) => {
  event.preventDefault();

  const inputTitle = document.querySelector("#title");
  const inputAuthor = document.querySelector("#author");
  const inputPages = document.querySelector("#pages");
  const inputIsRead = document.querySelector("#read");

  if (
    inputTitle.value === "" ||
    inputAuthor.value === "" ||
    inputPages.value === ""
  ) {
    return;
  }

  addBookToLibrary(
    inputTitle.value,
    inputAuthor.value,
    inputPages.value,
    inputIsRead.checked,
  );

  displayBooks(library);

  inputTitle.value = "";
  inputAuthor.value = "";
  inputPages.value = "";
  inputIsRead.checked = false;

  addBookDialog.hidePopover();
});

tableBody.addEventListener("click", (event) => {
  const removeBookButton = event.target.closest(".remove-book");
  if (!removeBookButton) return;

  const id = removeBookButton.dataset.id;

  library.splice(
    library.findIndex((book) => book.id === id),
    1,
  );

  displayBooks(library);
});

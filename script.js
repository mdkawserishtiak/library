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

Book.prototype.changeReadStatus = function () {
  this.isRead = !this.isRead;
};

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
          <td>
            <div class="p-0!">${book.isRead ? "Yes" : "No"}</div>

            <button
                class="p-0! cursor-pointer transition-all hover:border-b-3 change-read-status"
                data-id="${book.id}"
                >
                <img class="p-1!" src="./icons/exchange.png" width="26" height="26" />
            </button>
          </td>
          <td>
            <button
                class="p-0! cursor-pointer transition-all hover:border-b-3 remove-book"
                data-id="${book.id}"
                >
                <img class="p-1!" src="./icons/remove-book.png" width="40" height="40" />
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
  const changeReadStatusButton = event.target.closest(".change-read-status");

  if (!(removeBookButton || changeReadStatusButton)) return;

  const id = removeBookButton
    ? removeBookButton.dataset.id
    : changeReadStatusButton.dataset.id;

  const indexOfTheObject = library.findIndex((book) => book.id === id);

  if (removeBookButton) {
    library.splice(indexOfTheObject, 1);
  } else if (changeReadStatusButton) {
    library[indexOfTheObject].changeReadStatus();
  }

  displayBooks(library);
});

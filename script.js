const library = localStorage.getItem("library")
  ? JSON.parse(localStorage.getItem("library"))
  : [];

const tableBody = document.querySelector("#table-body");
const cardContainer = document.querySelector("#card-container");

const bookDialog = document.querySelector("#book-dialog");

const addBookButton = document.querySelector("#add-book-button");
const editBookButtonSpecial = document.querySelector("#edit-book-button");
const closeButton = document.querySelector("#close");

const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const selectCategory = document.querySelector("#category");
const inputPages = document.querySelector("#pages");
const inputIsRead = document.querySelector("#read");

function Book(id, title, author, category, pages, isRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }

  this.id = id;
  this.title = title;
  this.author = author;
  this.category = category;
  this.pages = pages;
  this.isRead = isRead;
}

const addBookToLibrary = (title, author, category, pages, isRead) => {
  const id = crypto.randomUUID();
  const book = new Book(id, title, author, category, pages, isRead);

  library.push(book);
  localStorage.setItem("library", JSON.stringify(library));
};

const displayBooks = () => {
  let cards = "";
  let rows = "";

  library.forEach((book) => {
    cards += `<div class="mt-10 p-5 border border-gray-100 rounded shadow-xl">
        <h2 class="flex justify-between border-b-2 border-gray-300 pb-3">
          <span class="font-black uppercase">Title</span>
          <span>${book.title}</span>
        </h2>

        <div class="flex justify-between border-b-2 border-gray-300 py-3">
          <span class="font-black uppercase">Author</span>
          <span>${book.author}</span>
        </div>

        <div class="flex justify-between border-b-2 border-gray-300 py-3">
          <span class="font-black uppercase">Category</span>
          <span>${book.category ? book.category : "Uncategorized"}</span>
        </div>

        <div class="flex justify-between border-b-2 border-gray-300 py-3">
          <span class="font-black uppercase">Pages</span>
          <span>${book.pages}</span>
        </div>

        <div class="flex justify-between border-b-2 border-gray-300 py-3">
          <span class="font-black uppercase">Read</span>
          <span class="flex items-center gap-2">
            ${book.isRead ? "Yes" : "No"}
            <button
              class="border-b-3 border-white cursor-pointer transition-all hover:border-black change-read-status"
              data-id="${book.id}"
            >
              <img
                class="p-1"
                src="./icons/exchange.png"
                width="27"
                height="27"
              /></button
          ></span>
        </div>

        <div class="flex justify-between pt-3">
          <span class="font-black uppercase">Actions</span>
          <span class="flex gap-2">
            <button
              class="border-b-3 border-white cursor-pointer transition-all hover:border-black edit-book"
              data-id="${book.id}"
            >
              <img
                class="p-1"
                src="./icons/edit-book.png"
                width="40"
                height="40"
              />
            </button>

            <button
              class="border-b-3 border-white cursor-pointer transition-all hover:border-black remove-book"
              data-id="${book.id}"
            >
              <img
                class="p-1"
                src="./icons/remove-book.png"
                width="40"
                height="40"
              />
            </button>
          </span>
        </div>
      </div>`;

    rows += `<tr class="odd:bg-gray-200/70">
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.category ? book.category : "Uncategorized"}</td>
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
          <td class="flex justify-center gap-3">
          <button
              class="p-0! cursor-pointer transition-all hover:border-b-3 edit-book"
              data-id="${book.id}"
            >
              <img
                class="p-1!"
                src="./icons/edit-book.png"
                width="40"
                height="40"
              />
            </button>

            <button
                class="p-0! cursor-pointer transition-all hover:border-b-3 remove-book"
                data-id="${book.id}"
                >
                <img class="p-1!" src="./icons/remove-book.png" width="40" height="40" />
              </button>
          </td>
        </tr>`;
  });

  tableBody.innerHTML = rows;
  cardContainer.innerHTML = cards;
};

const actionsHandler = (event) => {
  const removeBookButton = event.target.closest(".remove-book");
  const changeReadStatusButton = event.target.closest(".change-read-status");
  const editBookButton = event.target.closest(".edit-book");

  if (!(removeBookButton || changeReadStatusButton || editBookButton)) return;

  const id = removeBookButton
    ? removeBookButton.dataset.id
    : changeReadStatusButton
      ? changeReadStatusButton.dataset.id
      : editBookButton.dataset.id;

  const indexOfTheObject = library.findIndex((book) => book.id === id);

  if (removeBookButton) {
    library.splice(indexOfTheObject, 1);

    localStorage.setItem("library", JSON.stringify(library));
    displayBooks();
  } else if (changeReadStatusButton) {
    library[indexOfTheObject].isRead = !library[indexOfTheObject].isRead;

    localStorage.setItem("library", JSON.stringify(library));
    displayBooks();
  } else if (editBookButton) {
    addBookButton.classList.remove("flex");
    addBookButton.classList.add("hidden");

    editBookButtonSpecial.classList.remove("hidden");
    editBookButtonSpecial.classList.add("flex");

    bookDialog.showPopover();

    inputTitle.value = library[indexOfTheObject].title;
    inputAuthor.value = library[indexOfTheObject].author;
    selectCategory.value = library[indexOfTheObject].category;
    inputPages.value = library[indexOfTheObject].pages;
    inputIsRead.checked = library[indexOfTheObject].isRead;

    editBookButtonSpecial.onclick = (event) => {
      event.preventDefault();

      if (
        inputTitle.value === "" ||
        inputAuthor.value === "" ||
        inputPages.value === ""
      ) {
        return;
      }

      library[indexOfTheObject].title = inputTitle.value;
      library[indexOfTheObject].author = inputAuthor.value;
      library[indexOfTheObject].category =
        selectCategory.options[selectCategory.selectedIndex].text;
      library[indexOfTheObject].pages = inputPages.value;
      library[indexOfTheObject].isRead = inputIsRead.checked;

      inputTitle.value = "";
      inputAuthor.value = "";
      selectCategory.value = "Uncategorized";
      inputPages.value = "";
      inputIsRead.checked = false;

      bookDialog.hidePopover();

      addBookButton.classList.remove("hidden");
      addBookButton.classList.add("flex");

      editBookButtonSpecial.classList.remove("flex");
      editBookButtonSpecial.classList.add("hidden");

      localStorage.setItem("library", JSON.stringify(library));
      displayBooks();
    };
  }
};

displayBooks();

addBookButton.addEventListener("click", (event) => {
  event.preventDefault();

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
    selectCategory.options[selectCategory.selectedIndex].text,
    inputPages.value,
    inputIsRead.checked,
  );

  inputTitle.value = "";
  inputAuthor.value = "";
  selectCategory.value = "Uncategorized";
  inputPages.value = "";
  inputIsRead.checked = false;

  bookDialog.hidePopover();

  displayBooks();
});

tableBody.addEventListener("click", actionsHandler);
cardContainer.addEventListener("click", actionsHandler);
closeButton.addEventListener("click", () => {
  inputTitle.value = "";
  inputAuthor.value = "";
  selectCategory.value = "Uncategorized";
  inputPages.value = "";
  inputIsRead.checked = false;
});

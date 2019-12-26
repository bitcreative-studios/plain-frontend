pl.view.updateBook = {
  setupUserInterface() {
    const formElement = document.forms["Book"]
    const { commit: saveButton, bookSelection } = formElement
    let book
    let option
    // when a book is selected, populate the form
    bookSelection.addEventListener(
      "change",
      pl.view.updateBook.handleBookSelectionEvent
    )
    // set an event handler for the submit/save button
    saveButton.addEventListener(
      "click",
      pl.view.updateBook.handleSaveButtonClickEvent
    )
    // FIXME
    Book.loadAll()
    const keys = Object.keys(Book.instances)
    keys.forEach(isbn => {
      book = Book.instances[isbn]
      option = document.createElement("option")
      option.text = book.title
      option.value = book.isbn
      bookSelection.add(option, null)
    })
  },
  handleBookSelectionEvent(event) {
    const {
      target: { value: isbn },
    } = event
    const formElement = document.forms["Book"]
    const { title, year, selection } = formElement
    if (isbn) {
      title.value = Book.instances[isbn].title
      year.value = Book.instances[isbn].year
      selection.value = isbn
    } else {
      formElement.reset()
    }
  },
  handleSaveButtonClickEvent() {
    const formElement = document.forms["Book"]
    const {
      selection: { value: isbn },
      title: { value: title },
      year: { value: year },
    } = formElement.elements
    Book.update({ isbn, title, year })
    formElement.reset()
  },
}

/**
 *
 * @type {{setupUserInterface(): void, handleSaveButtonClickEvent(*): void}}
 */
pl.view.createBook = {
  setupUserInterface() {
    const saveButton = document.forms["Book"].commit
    //  load all book objects
    Book.loadAll()
    //  set an event handler for the save/submit button
    saveButton.addEventListener(
      "click",
      pl.view.createBook.handleSaveButtonClickEvent
    )
    //  handle the event when the browser window/tab is closed
    window.addEventListener("beforeunload", function() {
      Book.saveAll()
    })
  },
  handleSaveButtonClickEvent(event) {
    event.preventDefault()
    const formElement = document.forms["Book"]
    const slots = {
      isbn: formElement.isbn.value,
      title: formElement.title.value,
      year: formElement.year.value,
    }
    console.log(`Adding Book ${slots.isbn} to database`)
    console.table(slots)
    Book.add(slots)
    formElement.reset()
  },
}

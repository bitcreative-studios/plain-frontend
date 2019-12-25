import { randomInt, MAXIMUM_TEST_DATA } from "../utils"
import sampleBooks from "../../sample-data/books"

/**
 *
 * @param slots
 * @constructor
 */
function Book(slots) {
  this.isbn = slots.isbn
  this.title = slots.title
  this.year = slots.year
}

/**
 * The collection of all Book instances managed by the application
 * in the form of a JSON 'table' (i.e., a map of records).
 * Where an ISBN is a key for accessing the corresponding book record
 */
Book.instances = {}

/**
 * Convert a JS object representing a book record into
 * an instance of the Book class
 */
// TODO: Book.convertRow2Obj

/**
 * Load all managed Book instances from the persistent data store
 */
Book.loadAll = function() {
  let key = ""
  let keys = []
  let booksString = ""
  let books = {}
  try {
    if (localStorage.books) {
      booksString = localStorage.books
    }
  } catch (e) {
    alert(`Error when reading from Local Storage\n ${e}`)
  }
  if (booksString) {
    books = JSON.parse(booksString)
    keys = Object.keys(books)
    console.log(`${keys.length} books loaded.`)
    for (let i = 0; i < keys.length; i++) {
      key = keys[i]
      Book.instances[key] = Book.convertRow2Obj(books[key])
    }
  }
}

/**
 * Save all managed Book instances to the persistent data store
 */
Book.saveAll = function() {
  let booksString = ""
  let error = false
  const NUMBER_OF_BOOKS = Object.keys(Book.instances).length
  try {
    booksString = JSON.stringify(Book.instances)
    localStorage.books = booksString
  } catch (e) {
    alert(`Error while writing to Local Storage\n ${e}`)
    error = true
  }
  if (!error) console.log(`${NUMBER_OF_BOOKS} books saved`)
}

/**
 * Crate a new Book instance
 */
// TODO: Book.add

/**
 * Update an existing Book instance
 */
// TODO: Book.update

/**
 * Delete a Book instance
 */
// TODO: Book.destroy

/**
 * Generate some example book records as test data
 */
Book.generateData = function(count = 10) {
  const books = sampleBooks.slice(0, count)
  books.forEach(book => {
    Book.instances[book.isbn] = new Book(book)
  })
  Book.saveAll()
}

/**
 * Clear the book datastore
 */
Book.clearData = function() {
  if (confirm("Do you really want to delete all your book data?")) {
    localStorage.books = "{}"
  }
}

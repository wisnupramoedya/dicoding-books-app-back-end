const books = require('../models/books');

/**
 * Menampilkan seluruh buku.
 *
 * @param {Object} request - Objek permintaan.
 * @param {Object} request.query - Query parameters.
 * @param {string} [request.query.name] - Nama buku.
 * @param {boolean} [request.query.reading] - Status membaca buku.
 * @param {boolean} [request.query.finished] - Status buku sudah dibaca.
 * @param {Object} h - Toolkit respons.
 */

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let filteredBooks = books;

  if (name) {
    filteredBooks = filteredBooks.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (reading) {
    filteredBooks = filteredBooks.filter((book) => book.reading == reading);
  }

  if (finished) {
    filteredBooks = filteredBooks.filter((book) => book.finished == finished);
  }

  const response = h.response({
    status: 'success',
    data: {
      books: filteredBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

module.exports = getAllBooksHandler;
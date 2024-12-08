const books = require('../models/books');

/**
 * Menampilkan detail buku berdasarkan ID.
 *
 * @param {Object} request - Objek permintaan.
 * @param {Object} request.params - Parameter yang ada pada URL.
 * @param {string} request.params.id - ID buku.
 * @param {Object} h - Toolkit respons.
 */
const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.find((b) => b.id === id);

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = getBookByIdHandler;
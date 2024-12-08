const books = require('../models/books');

/**
 * Menghapus buku berdasarkan ID.
 *
 * @param {Object} request - Objek permintaan.
 * @param {Object} request.params - Parameter yang ada pada URL.
 * @param {string} request.params.id - ID buku.
 * @param {Object} h - Toolkit respons.
 */
const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = deleteBookByIdHandler;
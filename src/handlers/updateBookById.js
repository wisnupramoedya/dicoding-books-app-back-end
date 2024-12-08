const books = require('../models/books');

/**
 * Mengupdate buku berdasarkan ID.
 *
 * @param {Object} request - Objek permintaan.
 * @param {Object} request.payload - Payload dari permintaan.
 * @param {string} request.payload.name - Nama buku.
 * @param {number} [request.payload.year] - Tahun terbit buku.
 * @param {string} [request.payload.author] - Penulis buku.
 * @param {string} [request.payload.summary] - Ringkasan singkat buku.
 * @param {string} [request.payload.publisher] - Penerbit buku.
 * @param {number} request.payload.pageCount - Jumlah total halaman buku.
 * @param {number} request.payload.readPage - Jumlah halaman yang sudah dibaca.
 * @param {boolean} request.payload.reading - Status membaca buku.
 * @param {Object} request.params - Parameter yang ada pada URL.
 * @param {string} request.params.id - ID buku.
 * @param {Object} h - Toolkit respons.
 */
const updateBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();
  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = updateBookByIdHandler;
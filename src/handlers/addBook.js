const { nanoid } = require('nanoid');
const books = require('../models/books');

/**
 * Menambahkan buku baru.
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
 * @param {Object} h - Toolkit respons.
 */
const addBookHandler = (request, h) => {
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
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

module.exports = addBookHandler;
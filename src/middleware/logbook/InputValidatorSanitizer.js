import { body, param } from 'express-validator'
import * as logbookDAO from '../../dao/logbook/Logbook'
import * as entriDAO from '../../dao/logbook/Entri'

// CATATAN : File ini berisi middleware untuk memvalidasi dan sanitasi inputan yang dikirim oleh user

/* Validator dan Sanitizer untuk Dosen */

export const postNewLogbook = [
  body('nim', 'nim wajib diisi').exists().bail(),
  body('kelas_proyek', 'Kelas proyek wajib diisi').exists().bail(),
  body('nim', 'kelas_proyek').custom((value) => {
    return logbookDAO.getLogbook(value).then((logbook) => {
      if (logbook) {
        return Promise.reject(new Error('Logbook sudah terdaftar'))
      }
    })
  }),
  body('nama', 'Nama dosen wajib diisi').exists(),
  body('kode_kelas', 'kode_kelas wajib diisi').exists()
]

export const postNewEntri = [
  body('tanggal', 'tanggal wajib diisi').exists().bail(),
  body('tanggal').custom((value) => {
    return entriDAO.getEntri(value).then((entri) => {
      if (entri) {
        return Promise.reject(new Error('Entri sudah terdaftar'))
      }
    })
  })
]

export const deleteEntriById = [
  param('_id').custom((value) => {
    return entriDAO.getById(value).then((entri) => {
      if (!entri) {
        return Promise.reject(new Error('Entri dengan id tersebut tidak ditemukan'))
      }
    })
  })
]

import { body, param, query } from 'express-validator'
import logbookDAO from '../../dao/logbook/Logbook'
import entriDAO from '../../dao/logbook/Entri'

// CATATAN : File ini berisi middleware untuk memvalidasi dan sanitasi inputan yang dikirim oleh user

/* Validator dan Sanitizer untuk Logbook */

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

/* Validator dan Sanitizer untuk Entri */

export const postNewEntri = [
  body('tanggal')
    .trim()
    .notEmpty().withMessage('Tanggal tidak boleh kosong.')
    .bail()
    .isDate().withMessage('Format tanggal salah.')
    .bail()
    .custom((value, { req }) => {
      return logbookDAO.getLogbook({ _id: req.params.id_logbook })
        .then(async (logbook) => {
          if(logbook.data.length > 0) {
            const stringDate = value.split('/')
            const year = parseInt(stringDate[0], 10)
            const month = parseInt(stringDate[1], 10) - 1 // urutan bulan dimulai dari 0
            const day = parseInt(stringDate[2], 10)
            const date = new Date(year, month, day, 7) // tambah 7 supaya 00:00 di GMT
            
            const entriIDs = logbook.data[0].entri
            const entris = await Promise.all(entriIDs.map(id => entriDAO.getEntri({ _id: id })))
            for(let i = 0; i < entris.length; i++) {
              if(date.getTime() === entris[i].data[0].tanggal.getTime()) {
                return Promise.reject(new Error('Tanggal sudah ada.'))
              }
            }
          }
        })
      }),
  body('kegiatan')
    .trim()
    .notEmpty().withMessage('Kegiatan tidak boleh kosong'),
  body('hasil')
    .trim()
    .notEmpty().withMessage('Hasil tidak boleh kosong'),
  body('kesan')
    .trim()
    .notEmpty().withMessage('Kesan tidak boleh kosong')
]

export const deleteEntriById = [
  query('id').custom((value) => {
    return entriDAO.getEntri({ _id: value })
      .then((result) => {
        if (result.data.length <= 0) {
          return Promise.reject(new Error('Entri tidak ada.'))
        }
      })
  })
]

export const deleteEntriByDate = [
  param('id_logbook').custom((value) => {
    return logbookDAO.getLogbook({ _id: value })
      .then((result) => {
        if (result.data.length <= 0) {
          return Promise.reject(new Error('Logbook tidak ada.'))
        }
      })
  })
]

export const updateEntriById = [
  param('id').custom((value) => {
    return entriDAO.getEntri({ _id: value })
      .then((result) => {
        if (result.data.length <= 0) {
          return Promise.reject(new Error('Entri tidak ditemukan.'))
        }
      })
  }),
  body('tanggal')
    .trim()
    .notEmpty().withMessage('Tanggal tidak boleh kosong.')
    .bail()
    .isDate().withMessage('Format tanggal salah.'),
  body('kegiatan')
    .trim()
    .notEmpty().withMessage('Kegiatan tidak boleh kosong'),
  body('hasil')
    .trim()
    .notEmpty().withMessage('Hasil tidak boleh kosong'),
  body('kesan')
    .trim()
    .notEmpty().withMessage('Kesan tidak boleh kosong')
]

import { body, param } from 'express-validator'
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

export const postNewEntri = [
  body('tanggal')
    .trim()
    .notEmpty().withMessage('Tanggal tidak boleh kosong.')
    .bail()
    .isDate()
    .bail(),
  // .custom((value, { req }) => {
  //   const query = { _id: req.params.id_logbook }
  //   logbookDAO.getLogbook(query, function(err, logbook) {
  //     if(!logbook) {
  //       return new Error('Logbook tidak ada')
  //     } else {
  //       var i = 0
  //       for(i = 0; i < logbook[0].entri.length; i++) {
  //         const entriQuery = { _id: logbook[0].entri[i] }
  //         entriDAO.getEntri(entriQuery)
  //           .then((entri) => {
  //             if(entri) {
  //               var stringDate = value.split('/')
  //               const year = parseInt(stringDate[0], 10)
  //               const month = parseInt(stringDate[1], 10) - 1 // urutan bulan dimulai dari 0
  //               const day = parseInt(stringDate[2], 10)
  //               var date = new Date(year, month, day, 24) // 24nya bakal diapus karena udah dikalkulasi di frontend
  //               if(date.getTime() === entri.data[0].tanggal.getTime()) {
  //                 return new Error('Tanggal sudah ada.')
  //               }
  //             }
  //           })
  //       }
  //     }
  //   })
  // }),
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
  param('id').custom((value) => {
    return entriDAO.getEntri({ _id: value })
      .then((result) => {
        console.log("masukk", result.data.length <= 0)
        if (result.data.length <= 0) {
          return Promise.reject('Entri tidak ada.')
        }
      })
  })
]

export const updateEntriById = [
  param('id').custom((value) => {
    return entriDAO.getEntri({ _id: value })
      .then((result) => {
        if (result.data.length <= 0) {
          return Promise.reject('Entri tidak ada.')
        }
      })
  }),
  body('tanggal')
    .trim()
    .notEmpty().withMessage('Tanggal tidak boleh kosong.')
    .bail()
    .isDate(),
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

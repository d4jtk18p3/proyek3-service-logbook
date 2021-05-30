import { body, param } from 'express-validator'
import logbookDAO from '../../dao/logbook/Logbook'
import entriDAO from '../../dao/logbook/Entri'

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

export const postNewEntri = () => {
  return [
    // body('tanggal')
    // .trim()
    // .notEmpty().withMessage("tanggal tidak boleh kosong.")
    // .custom(async(value) => {
    //   let logbook = await logbookDAO.getLogbook({_id: req.params.id_logbook});
    //   console.log("udah masuk siss")
    //     let isExist = await logbook[0].entri.findOne({
    //         where: {
    //             tanggal: value
    //         }
    //     });
    //     if(isExist) {
    //         throw new Error("tanggal is already exist.");
    //     } else {
    //         return true;
    //     }
    // }),
  ]
}

export const deleteEntriById = [
  param('_id').custom((value) => {
    return entriDAO.getById(value).then((entri) => {
      if (!entri) {
        return Promise.reject(new Error('Entri dengan id tersebut tidak ditemukan'))
      }
    })
  })
]

import * as StudiDAO from '../dao/Studi'
import * as MahasiswaDAO from '../dao/Mahasiswa'
import * as PerkuliahanDAO from '../dao/Perkuliahan'
import LogbookDAO from '../dao/logbook/Logbook'
import { validationResult } from 'express-validator'

export const postNewStudi = async (req, res, next) => {
  try {
    const idMahasiswa = req.body.id_mahasiswa
    const idPerkuliahan = req.body.id_perkuliahan
    const error = validationResult(req)

    if (!error.isEmpty()) {
      error.status = 400
      throw error
    }

    const studi = await StudiDAO.insertOneStudi(idPerkuliahan, idMahasiswa)

    if (typeof studi === 'undefined') {
      error.status = 500
      error.message = 'Insert Studi gagal'
      throw error
    }
    //   res.status(200).json({
    //     message: 'insert studi sukses',
    //     data: {
    //       studi
    //     }
    //   })

    // get mahasiswa
    const nim = req.body.id_mahasiswa
    const mahasiswa = await MahasiswaDAO.findOneMahasiswaByNIM(nim)
    // get perkuliahan
    const perkuliahan = await PerkuliahanDAO.getPerkuliahanById(idPerkuliahan)
    if (perkuliahan != null) {
      // create logbook
      const logbook = {
        nama: mahasiswa.nama,
        nim: nim,
        kode_kelas: mahasiswa.kode_kelas,
        kelas_proyek: perkuliahan.id_mata_kuliah
      }
      const error = validationResult(req)
      if (!error.isEmpty()) {
        error.status = 400
        error.message = error.errors[0].msg
        throw error
      }
      LogbookDAO.postLogbook(logbook)
        .then((result) => {
          res.status(200).json({
            logbook: result.data,
            studi
          })
        })
        .catch(() => {
          const error = {
            status: 404,
            message: 'error creating logbook'
          }
          next(error)
        })
    } else {
      res.status(200).json({
        studi
      })
    }
  } catch (error) {
    next(error)
  }
}

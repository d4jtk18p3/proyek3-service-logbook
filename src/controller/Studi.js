import * as StudiDAO from '../dao/Studi'
import * as MahasiswaDAO from '../dao/Mahasiswa'
import * as PerkuliahanDAO from '../dao/Perkuliahan'
import LogbookDAO from '../dao/logbook/Logbook'
import { validationResult } from 'express-validator'

export const postNewStudi = async (req, res, next) => {
    try {
      const id_mahasiswa = req.body.id_mahasiswa
      const id_perkuliahan = req.body.id_perkuliahan
      const error = validationResult(req)
  
      if (!error.isEmpty()) {
        error.status = 400
        throw error
      }
  
      const studi = await StudiDAO.insertOneStudi(id_perkuliahan, id_mahasiswa)
  
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
      const idPerkuliahan = req.body.id_perkuliahan
      const perkuliahan = await PerkuliahanDAO.getPerkuliahanById(idPerkuliahan)
      console.log("INII "+ perkuliahan)


      if (perkuliahan!=null){
        const proyek = ['16TKO1083', '16TKO2073', '16TKO3073', '16TKO4063', '16TKO5073', '16TIN2043', '16TIN4053', '16TIN6063']
        const found = proyek.find(element => element === perkuliahan.id_mata_kuliah);
        console.log("FOOO "+found)
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

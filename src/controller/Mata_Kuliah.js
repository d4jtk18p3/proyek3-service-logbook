import * as mataKuliahDAO from '../dao/Mata_Kuliah'
import * as PerkuliahanDAO from '../dao/Perkuliahan'
import * as StudiDAO from '../dao/Studi'

// get matkul yang diampu
export const getMatkulById = async (req, res, next) => {
  try {
    const nip = req.params.nip // nanti ini diganti kauth
    const resultPerkuliahan = await PerkuliahanDAO.getPerkuliahanByNip(nip)
    if (resultPerkuliahan instanceof Error) {
      throw resultPerkuliahan
    }
    const resultPerkuliahanById = []
    for (let i = 0; i < resultPerkuliahan.length; i++) {
      const result = await PerkuliahanDAO.getPerkuliahanById(resultPerkuliahan[i])
      if (result != null) {
        resultPerkuliahanById.push(result)
      }
    }
    if (resultPerkuliahanById instanceof Error) {
      throw resultPerkuliahanById
    }
    const resultMatkul = []
    for (let i = 0; i < resultPerkuliahanById.length; i++) {
      const result = await mataKuliahDAO.getMataKuliahById(resultPerkuliahanById[i].id_mata_kuliah)
      resultMatkul.push(result)
    }
    if (resultMatkul instanceof Error) {
      throw resultMatkul
    }
    res.status(200).json({
      message: 'Sukses retrieve data mata kuliah',
      data: resultMatkul
    })
  } catch (error) {
    next(error)
  }
}

export const getMataKuliahProyekByNim = async (req, res, next) => {
  try {
    const nim = req.params.nim // nanti ini diganti kauth
    const resultStudi = await StudiDAO.getStudiByIdMahasiswa(nim)
    if (resultStudi instanceof Error) {
      throw resultStudi
    }
    const resultIdPerkuliahan = []
    for (let i = 0; i < resultStudi.length; i++) {
      const result = resultStudi[i].id_perkuliahan
      if (result != null) {
        resultIdPerkuliahan.push(result)
      }
    }
    console.log(resultIdPerkuliahan)
    if (resultIdPerkuliahan instanceof Error) {
      throw resultIdPerkuliahan
    }
    const resultPerkuliahan = []
    for (let i = 0; i < resultIdPerkuliahan.length; i++) {
      const result = await PerkuliahanDAO.getPerkuliahanById(resultIdPerkuliahan[i])
      if (result != null) {
        resultPerkuliahan.push(result)
      }
    }
    const last = resultPerkuliahan[resultPerkuliahan.length-1].id_mata_kuliah
    const resultMatkul = await mataKuliahDAO.getMataKuliahById(last)
    if (resultMatkul instanceof Error) {
      throw resultMatkul
    }
    res.status(200).json({
      message: 'Sukses retrieve data mata kuliah proyek terakhir',
      data: resultMatkul
    })
  } catch (error) {
    next(error)
  }
}

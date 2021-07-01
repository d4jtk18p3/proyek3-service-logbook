import * as mataKuliahDAO from '../dao/Mata_Kuliah'
import * as PerkuliahanDAO from '../dao/Perkuliahan'

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

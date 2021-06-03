import * as kelasDAO from '../dao/Kelas'
import * as PerkuliahanDAO from '../dao/Perkuliahan'
export const getKelasByMatkul = async (req, res, next) => {
  try {
    // get id perkuliahan by nip
    const nip = req.params.nip // nanti ini diganti kauth
    const resultPerkuliahan = await PerkuliahanDAO.getPerkuliahanByNip(nip)
    if (resultPerkuliahan instanceof Error) {
      throw resultPerkuliahan
    }
    // get table perkuliahan
    const idMataKuliah = req.query.id_mata_kuliah
    const resultPerkuliahanById = []
    for (let i = 0; i < resultPerkuliahan.length; i++) {
      const result = await PerkuliahanDAO.getPerkuliahanByIdMatkul(resultPerkuliahan[i], idMataKuliah)
      if (result != null) {
        resultPerkuliahanById.push(result)
      }
    }
    if (resultPerkuliahanById instanceof Error) {
      throw resultPerkuliahanById
    }

    // get table kelas
    const resultKelas = []
    for (let i = 0; i < resultPerkuliahanById.length; i++) {
      const result = await kelasDAO.getKelas(resultPerkuliahanById[i].kode_kelas)
      resultKelas.push(result)
    }
    if (resultKelas instanceof Error) {
      throw resultKelas
    }
    res.status(200).json({
      message: 'Sukses retrieve data kelas by matkul',
      data: resultKelas
    })
  } catch (error) {
    next(error)
  }
}

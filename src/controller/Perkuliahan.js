import * as PerkuliahanDAO from '../dao/Perkuliahan'

export const getKelasByMatkul = async (req, res, next) => {
  try {
    const kodeMatkul = req.params.id_mata_kuliah
    const resultKelas = await PerkuliahanDAO.getKelasByMatkul(kodeMatkul)
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

export const getMatkulById = async (req, res, next) => {
  try {
    const id = req.params.id
    const resultMatkul = await PerkuliahanDAO.getMatkulById(id)
    if (resultMatkul instanceof Error) {
      throw resultMatkul
    }
    res.status(200).json({
      message: 'Sukses retrieve data mata kuliah by id perkuliahan',
      data: resultMatkul
    })
  } catch (error) {
    next(error)
  }
}

export const getPerkuliahanByNip = async (req, res, next) => {
  try {
    const nip = req.params.nip // nanti ini diganti kauth
    const resultPerkuliahan = await PerkuliahanDAO.getPerkuliahanByNip(nip)
    if (resultPerkuliahan instanceof Error) {
      throw resultPerkuliahan
    }
    res.status(200).json({
      message: 'Sukses retrieve data mata perkuliahan by nip',
      data: resultPerkuliahan
    })
  } catch (error) {
    next(error)
  }
}

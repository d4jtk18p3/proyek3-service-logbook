import Perkuliahan from '@proyek3/postgres-database/models/Perkuliahan'
import Pengajar from '@proyek3/postgres-database/models/Pengajar'

export const getKelasByMatkul = async (idMataKuliah) => {
  try {
    const perkuliahan = await Perkuliahan.findAll({
      where: {
        id_mata_kuliah: idMataKuliah
      }
    })
    const arrKelas = []
    for (let i = 0; i < perkuliahan.length; i++) {
      arrKelas.push(perkuliahan[i].kode_kelas)
    }
    return arrKelas
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getMatkulById = async (id) => {
  try {
    const perkuliahan = await Perkuliahan.findAll({
      where: {
        id: id
      }
    })
    const arrMatkul = []
    for (let i = 0; i < perkuliahan.length; i++) {
      arrMatkul.push(perkuliahan[i].id_mata_kuliah)
    }
    return arrMatkul
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getPerkuliahanByNip = async (nip) => {
  try {
    const resultPengajar = await Pengajar.findAll({
      where: {
        nip: nip
      }
    })
    const arrPerkuliahan = []
    for (let i = 0; i < resultPengajar.length; i++) {
      arrPerkuliahan.push(resultPengajar[i].id_perkuliahan)
    }
    return arrPerkuliahan
  } catch (error) {
    return Promise.reject(error)
  }
}

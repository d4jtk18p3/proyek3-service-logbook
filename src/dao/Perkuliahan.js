import Perkuliahan from '@proyek3/postgres-database/models/Perkuliahan'
import Pengajar from '@proyek3/postgres-database/models/Pengajar'

export const getPerkuliahanKelasByMatkul = async (idMataKuliah) => {
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

export const getPerkuliahanById = async (id) => {
  try {
    const perkuliahan = await Perkuliahan.findOne({
      where: {
        id: id,
        id_mata_kuliah: ['6TKO1083','6TKO2073', '6TKO3073', '6TKO4063', '6TKO5073', '6TIN2043', '6TIN4053', '6TIN6063']
      }
    })
    return perkuliahan
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getPerkuliahanByIdMatkul = async (id, id_mata_kuliah) => {
  try {
    const perkuliahan = await Perkuliahan.findOne({
      where: {
        id: id,
        id_mata_kuliah: id_mata_kuliah,
      }
    })
    return perkuliahan
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

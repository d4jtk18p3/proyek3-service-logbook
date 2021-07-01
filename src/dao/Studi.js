import Studi from '@proyek3/postgres-database/models/Studi'

export const getStudiByIdMahasiswa = async (idMahasiswa) => {
  try {
    const studi = await Studi.findAll({
      where: {
        id_mahasiswa: idMahasiswa
      }
    })
    return studi
  } catch (error) {
    return Promise.reject(error)
  }
}

export const getStudiProyek = async (id) => {
  try {
    const studi = await Studi.findOne({
      where: {
        id: id,
        id_mata_kuliah: ['16TKO1083', '16TKO2073', '16TKO3073', '16TKO4063', '16TKO5073', '16TIN2043', '16TIN4053', '16TIN6063']
      }
    })
    return studi
  } catch (error) {
    return Promise.reject(error)
  }
}

export const insertOneStudi = async (idPerkuliahan, idMahasiswa) => {
  try {
    const studi = await Studi.create({
      idMahasiswa,
      idPerkuliahan
    })
    return studi
  } catch (error) {
    console.error(error)
  }
}

import MataKuliah from '@proyek3/postgres-database/models/Mata_Kuliah'

export const getMataKuliahById = async (id) => {
  try {
    const matakuliah = await MataKuliah.findOne({
      where: {
        id: id
      }
    })
    return matakuliah
  } catch (error) {
    return Promise.reject(error)
  }
}

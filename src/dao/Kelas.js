import Kelas from '@proyek3/postgres-database/models/Kelas'

export const getKelas = async (kodeKelas) => {
  try {
    const kelas = await Kelas.findOne({
      where: {
        kode_kelas: kodeKelas
      }
    })
    return kelas
  } catch (error) {
    return Promise.reject(error)
  }
}

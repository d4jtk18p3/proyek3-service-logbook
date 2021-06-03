import Kelas from '@proyek3/postgres-database/models/Kelas'

export const getKelas = async (kode_kelas) => {
    try {
      const kelas = await Kelas.findOne({
        where: {
          kode_kelas: kode_kelas
        }
      })
    } catch (error) {
      return Promise.reject(error)
    }
  }
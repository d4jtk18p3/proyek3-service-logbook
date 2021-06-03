import express from 'express'
import * as MataKuliahController from '../controller/Mata_Kuliah'

const router = express.Router()
router.get('/searchMatkul/:nip', MataKuliahController.getMatkulById) // get mata kuliah yang diampu dosen
export default router

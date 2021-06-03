import express from 'express'
import * as MataKuliahController from '../controller/Mata_Kuliah'

const router = express.Router()
router.get('/searchMatkul/:nip', MataKuliahController.getMatkulById)
export default router
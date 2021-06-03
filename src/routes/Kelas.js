import express from 'express'
import * as kelasController from '../controller/Kelas'

const router = express.Router()
router.get('/getKelas/:nip', kelasController.getKelasByMatkul) // get kelas berdasarkan mata kuliah yang diampu dosen
export default router

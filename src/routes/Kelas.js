import express from 'express'
import * as kelasController from '../controller/Kelas'

const router = express.Router()
router.get('/getKelas/:nip', kelasController.getKelasByMatkul)
export default router
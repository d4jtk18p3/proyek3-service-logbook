import express from 'express'
import * as PerkuliahanController from '../controller/Perkuliahan'

const router = express.Router()

router.get('/searchPerkuliahanByNip/:nip', PerkuliahanController.getPerkuliahanByNip)
router.get('/searchKelasByMatkul/:id_mata_kuliah', PerkuliahanController.getKelasByMatkul)
router.get('/searchMatkulById/:id', PerkuliahanController.getMatkulById)
router.get('/searchPerkuliahanDiampu/:nip', PerkuliahanController.getPerkuliahanDiampu) // get perkuliahan yang diampu dosen
export default router

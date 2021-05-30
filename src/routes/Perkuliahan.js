import express from 'express'
import * as PerkuliahanController from '../controller/Perkuliahan'

const router = express.Router()

router.get('/searchPerkuliahanByNip/:nip', PerkuliahanController.getPerkuliahanByNip)
router.get('/searchKelasByMatkul/:id_mata_kuliah', PerkuliahanController.getKelasByMatkul)
router.get('/searchMatkulById/:id', PerkuliahanController.getMatkulById)
export default router

import * as entriController from '../../controller/logbook/Entri'
import * as validatorSanitizer from '../../middleware/logbook/InputValidatorSanitizer'
import express from 'express'
const router = express.Router()
router.post('/create/:id_logbook', validatorSanitizer.postNewEntri, entriController.createEntri)
router.get('/:id', entriController.getEntri)
router.put('/update/:id_logbook', validatorSanitizer.updateEntriById, entriController.updateEntri)
router.put('/update-by-date/:tanggal', entriController.updateEntriByDate)
router.delete('/delete/:id_logbook', validatorSanitizer.deleteEntriById, entriController.removeEntri)
router.delete('/delete-by-date/:id_logbook', validatorSanitizer.deleteEntriByDate, entriController.removeEntriByDate)
export default router

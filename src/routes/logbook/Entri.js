import * as entriController from '../../controller/logbook/Entri'
import * as ValidatorSanitizer from '../../middleware/logbook/InputValidatorSanitizer'
import express from 'express'
const router = express.Router()
router.post('/create/:id_logbook', ValidatorSanitizer.postNewEntri, entriController.createEntri)
router.get('/:id', entriController.getEntri)
router.put('/update/:id', ValidatorSanitizer.updateEntriById, entriController.updateEntri)
router.put('/update-by-date/:tanggal', entriController.updateEntriByDate)
router.delete('/delete/:id_logbook', ValidatorSanitizer.deleteEntriById, entriController.removeEntri)
router.delete('/delete-by-date/:id_logbook', ValidatorSanitizer.deleteEntriByDate, entriController.removeEntriByDate)
export default router

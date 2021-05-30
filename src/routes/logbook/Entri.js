import * as entriController from '../../controller/logbook/Entri'
import * as ValidatorSanitizer from '../../middleware/logbook/InputValidatorSanitizer'
import express from 'express'
const router = express.Router()
router.post('/create/:id_logbook', entriController.createEntri)
router.get('/:id', entriController.getEntri)
router.put('/update/:id', entriController.updateEntri)
router.put('/update-by-date/:tanggal', ValidatorSanitizer.deleteEntriById, entriController.updateEntriByDate)
router.delete('/delete/:id_logbook', ValidatorSanitizer.deleteEntriById, entriController.removeEntri)
router.delete('/delete-by-date/:tanggal', ValidatorSanitizer.deleteEntriById, entriController.removeEntriByDate)
export default router

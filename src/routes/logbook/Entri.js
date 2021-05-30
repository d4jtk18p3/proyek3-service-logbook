import * as entriController from '../../controller/logbook/Entri'
import * as ValidatorSanitizer from '../../middleware/logbook/InputValidatorSanitizer'
import express from 'express'
const router = express.Router()
router.post('/create/:id_logbook', ValidatorSanitizer.postNewEntri, entriController.createEntri)
router.get('/:id', entriController.getEntri)
router.put('/update/:id', entriController.updateEntri)
router.delete('/delete/:id', ValidatorSanitizer.deleteEntriById, entriController.removeEntri)
export default router

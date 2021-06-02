import * as logbookController from '../../controller/logbook/Logbook'
import * as validatorSanitizer from '../../middleware/logbook/InputValidatorSanitizer'
import express from 'express'
const router = express.Router()
router.post('/create', validatorSanitizer.postNewLogbook, logbookController.createLogbook)
router.get('/:nim', logbookController.getLogbookById)
router.delete('/delete/:id', logbookController.removeLogbook)
export default router

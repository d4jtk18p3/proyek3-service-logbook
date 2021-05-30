import * as logbookController from '../../controller/logbook/Logbook'
import express from 'express'
const router = express.Router()
router.post('/create', logbookController.createLogbook)
router.get('/:id', logbookController.getLogbookById)
router.delete('/delete/:id', logbookController.removeLogbook)
export default router

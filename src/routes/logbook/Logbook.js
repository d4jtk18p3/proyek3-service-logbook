import * as logbookController from '../../controller/logbook/Logbook'
import express from 'express'
const router = express.Router()
router.post('/create', logbookController.createLogbook)
export default router

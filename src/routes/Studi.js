import express from 'express'
import * as StudiController from '../controller/Studi'

const router = express.Router()
router.post('/new-studi', StudiController.postNewStudi) // get perkuliahan yang diampu dosen
export default router

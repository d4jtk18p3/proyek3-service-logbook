import express from 'express'
import * as UserController from '../controller/User'
import * as ValidatorSanitizer from '../middleware/InputValidatorSanitizer'

const router = express.Router()

router.post('/create', ValidatorSanitizer.createUser, UserController.createUser)
router.delete('/delete/:username', UserController.deleteUserbyUsername)

export default router

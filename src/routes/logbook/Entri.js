import * as entriController from '../../controller/logbook/Entri';
import express from 'express'
const router = express.Router()

    router.post('/create', entriController.createEntri);
    router.get('/get/:id', entriController.getEntri);
    router.put('/update/:id', entriController.updateEntri);
    router.delete('/remove/:id', entriController.removeEntri);
export default router
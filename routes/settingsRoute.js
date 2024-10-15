import express from 'express';
import { getUserSettings, updateUserSettings } from '../controllers/settingsController.js';
const router = express.Router();

router.get('/:id', getUserSettings);
router.put('/:id', updateUserSettings);

export default router;

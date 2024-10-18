import { getAPIKEY } from "../controllers/apiController.js";
import express from 'express';


const router = express.Router();

router.get('/:id', getAPIKEY);

export default router;

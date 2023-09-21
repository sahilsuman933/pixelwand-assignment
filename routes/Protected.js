import express from 'express';
import AuthValidation from '../middlewares/AuthValidation.js';

const router = express.Router();

router.get('/test', AuthValidation, async (req, res) => res.status(200).json({
  message: 'You are inside protected route!',
}));

export default router;

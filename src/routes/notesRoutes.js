import { Router } from 'express';
import { getNoteById, getNotes } from '../controllers/notesController.js';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello world!' });
});

router.get('/notes', getNotes);

router.get('/notes/:noteId', getNoteById);

export default router;

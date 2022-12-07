import { Router } from 'express';
import controllers from '../controllers';
const router = Router();

router.get('/api/users', controllers.getUsers);
router.get('/api/users/:username/details', controllers.getUser);
router.get('/api/users/:username/repos', controllers.getUserRepos);

export default router;
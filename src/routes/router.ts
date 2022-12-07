import { Router } from 'express';
import controllers from '../controllers';
const router = Router();

router.use('/api/users', controllers.getUsers);

export default router;
import { Router } from 'express';
import { Meeting } from '../controllers/email.controller.ts';
import { RejectAppointment } from '../controllers/reject.controller.ts';

const router = Router();

// {{URL}}/api/v1/
router.route('/email/:id').post(Meeting);
router.route('/reject/:id').post(RejectAppointment);


export default router;
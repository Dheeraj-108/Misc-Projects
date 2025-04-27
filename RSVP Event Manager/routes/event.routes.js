import Router from 'express';
import { 
    createEvent, 
    deleteEvent, 
    editEventDetails, 
    fetchSpecificEvent, 
    renderEventForm, 
    renderEvents, 
    voteInEvent 
} from '../controllers/event.controllers.js';

const router = Router();

router.route('/').get(renderEvents)
.post(createEvent)

router.route('/userevents/:id')
.get(fetchSpecificEvent)
.delete(deleteEvent)
.patch(editEventDetails)

router.get('/create', renderEventForm);
router.post('/vote', voteInEvent)

export default router;
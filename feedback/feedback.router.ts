import {Router} from '../commons/router';
import * as restify from 'restify';
import {Feedback} from './feedback.model';

class FeedbackRouter extends Router {
    applyRoutes(application: restify.Server) {
        application.get('/feedbacks', (req, resp, next) => {
            Feedback.find().then(feedbacks => {
                resp.json(feedbacks);
                return next();
            })
        });
    }
}

export const feedbacksRouter = new FeedbackRouter();
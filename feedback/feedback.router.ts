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

        application.get('/feedbacks/:id', (req, resp, next) => {
            Feedback.findById(req.params.id).then(feedback => {
                if (feedback) {
                    resp.json(feedback);
                    return next();
                }

                resp.send(404);
                return next();
            })
        });

        application.post('/feedbacks', (req, resp, next) => {
            let feedback = new Feedback(req.body);
            feedback.save().then(saved => {
                resp.json(saved);
                return next();
            });
        });
    }
}

export const feedbacksRouter = new FeedbackRouter();
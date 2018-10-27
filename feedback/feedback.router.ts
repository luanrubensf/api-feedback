import {Router} from '../commons/router';
import * as restify from 'restify';
import {Feedback} from './feedback.model';
import RouterConstants from '../commons/router.constants';

class FeedbackRouter extends Router {

    constructor() {
        super();
        this.on(RouterConstants.BEFORE_RENDER, document => {
            console.log(RouterConstants.BEFORE_RENDER + ': ', document);
        });
    }

    applyRoutes(application: restify.Server) {

        application.get('/feedbacks', (req, resp, next) => {
            Feedback.find()
                .then(this.render(resp, next))
                .catch(next);
        });

        application.get('/feedbacks/:id', (req, resp, next) => {
            Feedback.findById(req.params.id)
                .then(this.render(resp, next))
                .catch(next);
        });

        application.post('/feedbacks', (req: restify.Request, resp, next) => {
            let feedback = new Feedback(req.body);
            feedback.save()
                .then(this.render(resp, next))
                .catch(next);
        });

        application.put('/feedbacks/:id', (req, resp, next) => {
            const options = {
                overwrite: true
            };
            Feedback.update({_id: req.params.id}, req.body, options)
                .exec().then((result) => {
                if (result.n) {
                    return Feedback.findById(req.params.id);
                }
                resp.send(404);
            })
                .then(this.render(resp, next))
                .catch(next);
        });
    }
}

export const feedbacksRouter = new FeedbackRouter();
import {Server} from './server/server'
import {feedbacksRouter} from './feedback/feedback.router';

const server = new Server();

server.bootstrap([feedbacksRouter])
    .then(server => {
        console.log('Connected to database');
        console.log('Server is listening on:', server.application.address());
    })
    .catch(error => {
        console.log('Server failed to start');
        console.error(error);
        process.exit(1);
    });

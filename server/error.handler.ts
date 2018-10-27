import * as restify from 'restify';

export const handleError = (req: restify.Request, res: restify.Response, err, done) => {
    res.send(500, { message: err.message});
    return done();
};
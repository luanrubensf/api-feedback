import * as restify from 'restify';
import * as mongoose from 'mongoose';

import {environment} from '../commons/environment';
import {Router} from '../commons/router';
import {mergePatchBodyParser} from './merge-patch.parser';

export class Server {

    application: restify.Server;

    initializeDb(): Promise<any> {
        (<any>mongoose).Promise = global.Promise;
        return mongoose.connect(environment.db.url, {useNewUrlParser: true});
    }

    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'feedback-api',
                    version: '1.0.0'
                });

                this.configPlugins();

                for (let router of routers) {
                    router.applyRoutes(this.application);
                }

                this.application.listen(environment.server.port, () => {
                    resolve(this.application);
                });

            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }

    configPlugins() {
        this.application.use(restify.plugins.queryParser());
        this.application.use(restify.plugins.bodyParser());
        this.application.use(mergePatchBodyParser);
    }

    bootstrap(routers: Router[]): Promise<Server> {
        return this.initializeDb().then(() =>
            this.initRoutes(routers).then(() => this));
    }
}
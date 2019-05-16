import * as compose from 'koa-compose';
import * as Router from 'koa-router';
import ping from './ping';
import email from './email';

const router = new Router();
const routes = router.routes();
const routesToExport = [routes, ping, email];

export default () => compose(routesToExport);

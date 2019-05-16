import * as Router from 'koa-router';
import * as compose from 'koa-compose';
import config from '../../config/index';
import { ping } from '../controller/ping';

const router = new Router({
  prefix: `${config.api.baseURL}/ping`,
});

/**
 * @api       {post} /ping ping test
 * @apiName   Ping test
 * @apiGroup  Ping
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "meta": {
 *       "status": 200,
 *       "message": "success"
 *     }
 *     "data": "pong!"
 *   }
 */
router.get('/', ping);

const routes = router.routes();
export default compose([routes]);

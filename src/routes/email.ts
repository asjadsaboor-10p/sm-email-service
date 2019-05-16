import * as Router from 'koa-router';
import * as compose from 'koa-compose';
import config from '../../config/index';
import { sendEmail } from '../controllers/email';

const router = new Router({
  prefix: `${config.api.baseURL}/email`,
});

/**
 * @api       {post} /email send email
 * @apiName   Send Email
 * @apiGroup  Email
 * @apiSuccessExample Success-Response:
 *   HTTP/1.1 200 OK
 *   {
 *     "meta": {
 *       "status": 200,
 *       "message": "success"
 *     }
 *   }
 */
router.post('/', sendEmail);

const routes = router.routes();
export default compose([routes]);

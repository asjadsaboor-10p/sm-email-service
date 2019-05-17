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
 *
 * @apiParam (Body) {String[]{10}} to email addresses
 * @apiParam (Body) {String[]{10}} [cc] cc email addresses
 * @apiParam (Body) {String[]{10}} [bcc] to email addresses
 * @apiParam (Body) {String{250}} subject email subject
 * @apiParam (Body) {String{5000}} body email body in text
 *
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

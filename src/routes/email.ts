import * as Router from 'koa-router';
import * as compose from 'koa-compose';
import config from '../../config/index';
import { sendEmail } from '../controllers/email';

const router = new Router({
  prefix: `${config.api.baseURL}/email`,
});

/**
 * @api       {post} /email/send send email
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
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 400 Bad Request
 *  {
 *   "meta": {
 *       "status": 400,
 *       "message": "to email is required"
 *    }
 *  }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 404 Not Found
 *  {
 *   "meta": {
 *       "status": 400,
 *       "message": "Emails should be unique between to,cc and bcc"
 *    }
 *  }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 503 Service Unavailable
 *  {
 *   "meta": {
 *       "status": 503,
 *       "message": "Service unaavailable"
 *    }
 *  }
 * @apiErrorExample {json} Error-Response:
 *   HTTP/1.1 500 Internal Server Error
 *  {
 *   "meta": {
 *       "status": 500,
 *       "message": "Something wend wrong"
 *    }
 *  }
 */
router.post('/send', sendEmail);

const routes = router.routes();
export default compose([routes]);

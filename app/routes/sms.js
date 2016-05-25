import {baseApi} from '../configer'
import {captcha, authenticate} from '../controllers/sms'

export default (router)=>{
	router.prefix(`/${baseApi}`)

	router.post('/captcha', captcha)
	//authenticate
	router.post('/authenticate', authenticate)

	return router;
}
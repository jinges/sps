import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import convert from 'koa-convert'
import mongoose from 'mongoose'
import passport from 'koa-passport'
import session from 'koa-generic-session'
import MongoStore from 'koa-generic-session-mongo'
import Router from 'koa-router'

import cros from './middleware/crosMiddleware'
import pipeMiddleware from './middleware/pipeMiddleware'

import routes from './routes'
import {port, mongodb} from './configer'

mongoose.connect(mongodb)
mongoose.connection.on('error', console.error)
mongoose.connection.once('open', () => console.log('Connected to db!'))

const app = new Koa()
const router = new Router()

app.keys = ['captcha']

app.use(convert.compose(
	cros,
	bodyParser(),
	logger(),
	session({
	    store: new MongoStore()
	})
))

//login
//
app.use(convert(
	router.post('/login', function *(next){
		const ctx = this;
		console.log(ctx)
		yield* passport.authenticate('local', function*(err, user, info) {
		    if (err) { 
		    	ctx.body = err;
		    }
		    if (!user) { 
		    	ctx.body = '用户名或密码错误'
		    }
		    ctx.login(user, function(err) {
		        ctx.body = '登录成功'
		    });
		}).call(this, next)
	})
))



app.use(passport.initialize())
app.use(passport.session())

routes(app)

app.on('error', (err, ctx)=>{
    console.log(err);
    log.error('server error', err, ctx);
})

app.listen(port, () => console.log(`The server is running at http://localhost:${port}/`));

export default app
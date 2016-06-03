import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import convert from 'koa-convert'
import mongoose from 'mongoose'
import passport from 'koa-passport'
import session from 'koa-generic-session'
import MongoStore from 'koa-generic-session-mongo'
import cors  from 'koa-cors'

import pipeMiddleware from './middleware/pipeMiddleware'
import authMiddleware from './middleware/authMiddleware'

import Router from './routes'
import {port, mongodb} from './configer'

mongoose.connect(mongodb)
mongoose.connection.on('error', console.error)
mongoose.connection.once('open', () => console.log('Connected to db!'))

const app = new Koa()
const router = require('koa-router')();

app.keys = ['captcha']

app.use(convert.compose(
	cors({
		Origin: 'http://127.0.0.1:8080',
		credentials: true
	}),
	bodyParser(),
	logger(),
	session(app)
))

// app.use(passport.initialize())
// app.use(passport.session())


Router(app)

app.on('error', (err, ctx)=>{
    console.log(err);
    log.error('server error', err, ctx);
})

app.listen(port, () => console.log(`The server is running at http://localhost:${port}/`));

export default app
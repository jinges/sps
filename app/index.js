import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import convert from 'koa-convert'
import session from 'koa-session'
import mongoose from 'mongoose'

import cros from './middleware/crosMiddleware'
import pipeMiddleware from './middleware/pipeMiddleware'

import router from './routes'
import {port, mongodb} from './configer'

mongoose.connect(mongodb)
mongoose.connection.on('error', console.error)
mongoose.connection.once('open', () => console.log('Connected to db!'))

const app = new Koa()

app.use(convert.compose(
	cros,
	bodyParser(),
	logger(),
	session({
		key: ['uid','captcha']
	},app)
))

router(app);


app.on('error', (err, ctx)=>{
    console.log(err);
    log.error('server error', err, ctx);
})

app.listen(port, () => console.log(`The server is running at http://localhost:${port}/`));

export default app
import 'express-async-errors'
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
const app = express()
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary'
import helmet from 'helmet'
import cors from 'cors'

// routers
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'

// new routers
import ruangRouter from './routes/ruangRouter.js'
import gudangRouter from './routes/gudangRouter.js'
import multimediaRouter from './routes/multimediaRouter.js'
import asetLainRouter from './routes/asetLainRouter.js'
import suratMasukRouter from './routes/suratMasukRouter.js'
import suratKeluarRouter from './routes/suratKeluarRouter.js'
import administrasiRouter from './routes/administrasiRouter.js'
import prokerRouter from './routes/prokerRouter.js'
import logRouter from './routes/logRouter.js'
import userManagementRouter from './routes/userManagementRouter.js'
import viatikumRouter from './routes/viatikumRouter.js'
import limitRouter from './routes/limitRouter.js'

// public
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

// middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'
import {
  authenticateUser,
  authorizePermissions
} from './middleware/authMiddleware.js'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

const __dirname = dirname(fileURLToPath(import.meta.url))
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.static(path.resolve(__dirname, './client/dist')))
app.use(cookieParser())
app.use(express.json())
app.use(helmet())

// cors
app.use(
  cors({
    origin: 'https://proker.gkitamancibunut.org',
    credentials: true
  })
)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' })
})

app.use('/api/v1/users', authenticateUser, userRouter)
app.use('/api/v1/auth', authRouter)

const komisi = [
  'komisi anak',
  'komisi remaja',
  'komisi pemuda',
  'komisi dewasa',
  'komisi usia lanjut',
  'komisi kesenian',
  'komisi multimedia',
  'urusan 1',
  'urusan 2',
  'urusan 3',
  'urusan 4',
  'urusan 5',
  'urusan 6',
  'urusan 7',
  'urusan 8'
]

// new
app.use(
  '/api/v1/ruangs',
  authenticateUser,
  authorizePermissions('admin', 'staff kantor', ...komisi),
  ruangRouter
)
app.use(
  '/api/v1/gudang',
  authenticateUser,
  authorizePermissions('admin', 'staff kantor'),
  gudangRouter
)
app.use(
  '/api/v1/multimedia',
  authenticateUser,
  authorizePermissions('admin', 'staff kantor'),
  multimediaRouter
)
app.use(
  '/api/v1/asetLain',
  authenticateUser,
  authorizePermissions('admin', 'staff kantor'),
  asetLainRouter
)
app.use(
  '/api/v1/suratMasuk',
  authenticateUser,
  authorizePermissions('admin', 'staff kantor'),
  suratMasukRouter
)
app.use(
  '/api/v1/suratKeluar',
  authenticateUser,
  authorizePermissions('admin', 'staff kantor'),
  suratKeluarRouter
)
app.use(
  '/api/v1/administrasi',
  authenticateUser,
  authorizePermissions('admin', 'majelis', ...komisi, 'staff keuangan'),
  administrasiRouter
)
app.use(
  '/api/v1/proker',
  authenticateUser,
  authorizePermissions('admin', 'majelis', ...komisi, 'staff keuangan'),
  prokerRouter
)
app.use(
  '/api/v1/viatikum',
  authenticateUser,
  authorizePermissions('admin', 'majelis', 'staff keuangan'),
  viatikumRouter
)
app.use(
  '/api/v1/log',
  authenticateUser,
  authorizePermissions('admin'),
  logRouter
)

app.use(
  '/api/v1/user',
  authenticateUser,
  authorizePermissions('admin'),
  userManagementRouter
)

app.use(
  '/api/v1/limit',
  authenticateUser,
  authorizePermissions('admin'),
  limitRouter
)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'))
})

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' })
})

app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5100

try {
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}

import express, { Application} from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandeler'
import { UserRoutes } from './app/modules/users/user.route'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes

app.use('/api/v1/users/', UserRoutes)

// Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {

// })

//global error handler
app.use(globalErrorHandler)

export default app

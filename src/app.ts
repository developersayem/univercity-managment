import express, { Application, NextFunction, Request, Response} from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.route'
import { error } from 'winston'
const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes

app.use('/api/v1/users/', usersRouter)

//custom error handler
class ApiError extends Error {
  statusCode: number

  constructor(statusCode: number, message: string | undefined, stack = '') {
    super(message)
    this.statusCode = statusCode
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

// Testing
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  // next(new ApiError(400, 'Testing Error logger'))
  next("error hoise")
})

//global error handler
app.use(err,req: Request, res: Response, next: NextFunction)=> {
  if (err instanceof Error) {
    res.status(400).json({error:err})
  } else {
    res.status(500).json({error:"something went wrong"})
   }
}

export default app

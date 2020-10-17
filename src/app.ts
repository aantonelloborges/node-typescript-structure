var cors = require('cors')

require('dotenv/config')

import { CorsOptions } from 'cors'
import express from 'express'
import mongoose from 'mongoose'

import routes from './routes'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares (): void {
    const API_URL = '';
    
    //options for cors midddleware
    const options: CorsOptions = {
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
      ],
      credentials: true,
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      origin: API_URL,
      preflightContinue: false,
    };

    this.express.use(express.json())
    this.express.use(cors(options))
  }

  private database (): void {
    mongoose.connect(`mongodb://${process.env.DB_HOST}:27017/tsexample`, { useUnifiedTopology: true })
  }

  private routes (): void {
    this.express.use(routes)
  }
}

export default new App().express

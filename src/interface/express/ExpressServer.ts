import express, { Express } from 'express'
import PostController from './controller/PostController'
import BookingController from './controller/BookingController'
import bodyParser from 'body-parser'
import { Config } from '../../../main'

class ExpressServer {
  app: Express
  postController: PostController
  bookingController: BookingController

  constructor(postController: PostController, bookingController: BookingController) {
    this.app = express()
    this.postController = postController
    this.bookingController = bookingController
  }

  addPostRoute() {
    const router = express.Router()

    router.get('/', this.postController.allPost.bind(this.postController))
    router.post('/', this.postController.createPost.bind(this.postController))

    return router
  }

  addBookingRoute() {
    const router = express.Router()

    router.get('/', this.bookingController.allBooking.bind(this.bookingController))
    router.post('/', this.bookingController.createBooking.bind(this.bookingController))
    router.put('/:id/cancel', this.bookingController.cancelBooking.bind(this.bookingController))

    return router
  }

  setup() {
    this.app.use(bodyParser.json())

    this.app.get('/', (req, res) => {
      res.send('Express + TypeScript Server');
    });

    this.app.use('/post', this.addPostRoute())
    this.app.use('/booking', this.addBookingRoute())
  }

  start(config: Config) {
    this.app.listen(config.PORT, () => {
      console.log('Server is running at port ' + config.PORT)
    })
  }
}

export default ExpressServer
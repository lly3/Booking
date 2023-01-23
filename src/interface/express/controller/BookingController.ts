import { Request, Response } from "express"
import BookingUseCase from "../../../use_case/Booking"

export type CreateBookingRequest = {
  clientId: string
  postId: string
  from: Date
  to: Date
}

class BookingController {
  bookingUseCase: BookingUseCase

  constructor(bookingUseCase: BookingUseCase) {
    this.bookingUseCase = bookingUseCase
  }

  createBooking(req: Request, res: Response) {
    // validation things eg. authentication, validate form input

    // create booking
    const bookingRequest: CreateBookingRequest = {
      clientId: req.body.clientId,
      postId: req.body.postId,
      from: new Date(req.body.from),
      to: new Date(req.body.to),
    }
    try {
      this.bookingUseCase.createBooking(bookingRequest)
      res.sendStatus(200)
    }
    catch(e) {
      console.error(e)
      res.sendStatus(400)
    }
  }

  cancelBooking(req: Request, res: Response) {
    // validation things eg. authentication, validate form input

    // cancel booking
    const id = req.params.id
    try {
      this.bookingUseCase.cancelBooking(id)
      res.sendStatus(200)
    }
    catch(e) {
      console.error(e)
      res.sendStatus(400)
    }
  }

  allBooking(req: Request, res: Response) {
    res.json(this.bookingUseCase.allBooking())
  }
}

export default BookingController
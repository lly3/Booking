import { Request, Response } from "express"
import BookingUseCase, { BookingRequest } from "../../../use_case/Booking"

export type CreateBookingRequest = {
  clientId: string
  postId: string
  from: string
  to: string
}

function toBookingRequestUseCase(createBookingRequest: CreateBookingRequest): BookingRequest {
  return {
    clientId: createBookingRequest.clientId,
    postId: createBookingRequest.postId,
    from: new Date(createBookingRequest.from),
    to: new Date(createBookingRequest.to)
  }
}

class BookingController {
  bookingUseCase: BookingUseCase

  constructor(bookingUseCase: BookingUseCase) {
    this.bookingUseCase = bookingUseCase
  }

  createBooking(req: Request, res: Response) {
    // validation things eg. authentication, validate form input

    // create booking
    const createBookingRequest: CreateBookingRequest = {
      clientId: req.body.clientId,
      postId: req.body.postId,
      from: req.body.from,
      to: req.body.to,
    }
    const bookingRequest = toBookingRequestUseCase(createBookingRequest)
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

  async allBooking(req: Request, res: Response) {
    res.json(await this.bookingUseCase.allBooking())
  }
}

export default BookingController
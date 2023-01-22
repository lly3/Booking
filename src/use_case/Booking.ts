import Booking from "../entities/Booking";
import BookingRepository from "../repository/BookingRepository";
import { generateBookingId } from "../utils/generateId";

export type BookingRequest = {
  clientId: string
  postId: string
  from: Date
  to: Date
}

class BookingUseCase {
  bookingRepository: BookingRepository

  constructor(bookingRepository: BookingRepository) {
    this.bookingRepository = bookingRepository
  }

  createBooking(bookingRequest: BookingRequest) {
    // validation phase
    const bookingList = this.bookingRepository.getAll()
    const isBooked = bookingList.some(booking => {
      return isOverlapDate(bookingRequest.from, bookingRequest.to, booking.from, booking.to) && (booking.status == "booked" || booking.status == "check-in")
    })
    if (isBooked) {
      throw new Error(`Post Id ${bookingRequest.postId} has been booked`)
    }

    // create booking
    const booking = new Booking(
      generateBookingId(),
      bookingRequest.clientId,
      bookingRequest.postId,
      bookingRequest.from,
      bookingRequest.to,
      "booked"
    )
    
    this.bookingRepository.create(booking)
  }

  cancelBooking(postId: string) {
    const booking = this.bookingRepository.getById(postId)
    if(booking == undefined) {
      throw new Error(`Booking Id ${postId} not found`)
    }

    booking.status = "cancel"
    this.bookingRepository.update(postId, booking)
  }

  allBooking() {
    return this.bookingRepository.getAll()
  }
}

const isOverlapDate = (s_from: Date, s_to: Date, d_from: Date, d_to: Date) => {
  if(d_to > s_from && d_to < s_to) {
    return true
  }
  if(d_from > s_from && d_from < s_to) {
    return true
  }
  if(d_from < s_from && d_to > s_to) {
    return true
  }
  if(d_from > s_from && d_to < s_to) {
    return true
  }

  return false
}

export default BookingUseCase
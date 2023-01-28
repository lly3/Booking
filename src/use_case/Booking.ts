import Booking from "../entities/Booking";
import BookingRepository from "../repository/BookingRepository";
import PostRepository from "../repository/PostRepository";
import { generateBookingId } from "../utils/generateId";
import MockBookingRepository from "./tests/mocks/MockBookingRepository";
import MockPostRepository from "./tests/mocks/MockPostRepository";

export type BookingRequest = {
  clientId: string
  postId: string
  from: Date
  to: Date
}

class BookingUseCase {
  bookingRepository: BookingRepository
  postRepository: PostRepository

  constructor(bookingRepository: BookingRepository | MockBookingRepository, postRepository: PostRepository | MockPostRepository) {
    this.bookingRepository = bookingRepository
    this.postRepository = postRepository
  }

  async createBooking(bookingRequest: BookingRequest) {
    // validation phase
    const post = await this.postRepository.getById(bookingRequest.postId)
    if(post == null) {
      throw new Error(`Invalid post id ${bookingRequest.postId} doesn't exist`)
    }

    if(bookingRequest.from > bookingRequest.to) {
      throw new Error(`Invalid start date and finish date`)
    }

    const bookingList = await this.bookingRepository.getAll()
    const isBooked = bookingList.some(booking => {
      return booking.postId === bookingRequest.postId 
      && isOverlapDate(booking.from, booking.to, bookingRequest.from, bookingRequest.to) 
      && (booking.status == "booked" || booking.status == "check-in")
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

  async cancelBooking(id: string) {
    const booking = await this.bookingRepository.getById(id)
    if(booking == undefined) {
      throw new Error(`Booking Id ${id} not found`)
    }

    booking.status = "cancel"
    this.bookingRepository.update(id, booking)
  }

  allBooking() {
    return this.bookingRepository.getAll()
  }
}

const isOverlapDate = (s_from: Date, s_to: Date, d_from: Date, d_to: Date) => {
  if((d_to > s_from && d_to < s_to) || (s_to > d_from && s_to < d_to)) {
    return true
  }
  if((d_from > s_from && d_from < s_to) || (s_from > d_from && s_from < d_to)) {
    return true
  }
  if(d_from < s_from && d_to > s_to) {
    return true
  }
  if(d_from > s_from && d_to < s_to) {
    return true
  }
  if(d_from == s_from && d_to == s_to) {
    return true
  }

  return false
}

export default BookingUseCase
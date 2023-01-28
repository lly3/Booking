import Client from "../../entities/Client"
import BookingUseCase, { BookingRequest } from "../Booking"
import MockPostRepository from "./mocks/MockPostRepository"
import MockBookingRepository from "./mocks/MockBookingRepository"

let mockBookingRepository: MockBookingRepository, mockPostRepository: MockPostRepository, bookingUseCase: BookingUseCase

let mockClient: Client[] = [
  {
    id: "0",
    name: "John",
    phone: "1234",
    address: "earth",
  },
  {
    id: "1",
    name: "Jojo",
    phone: "3546",
    address: "mars",
  },
]

beforeEach(() => {
  mockBookingRepository = new MockBookingRepository()
  mockPostRepository = new MockPostRepository()
  bookingUseCase = new BookingUseCase(mockBookingRepository, mockPostRepository)
})

describe('test booking', () => {
  test('book successfully', async () => {
    const postId = "0"

    const bookingRequest: BookingRequest = {
      clientId: mockClient[1].id,
      postId: postId,
      from: new Date("2023-01-20"),
      to: new Date("2023-01-22"),
    }

    await bookingUseCase.createBooking(bookingRequest)

    expect((await mockBookingRepository.getAll()).length).toBe(2)
  })

  test('invalid date time', async () => {
    expect.assertions(1)

    const postId = "0"

    const bookingRequest: BookingRequest = {
      clientId: mockClient[1].id,
      postId: postId,
      from: new Date("2023-01-24"),
      to: new Date("2023-01-22"),
    }

    try {
      await bookingUseCase.createBooking(bookingRequest)
    }
    catch(e) {
      expect((e as Error).message).toBe(`Invalid start date and finish date`)
    }
  })

  test('invalid post id', async () => {
    expect.assertions(1)

    const postId = "214" // invalid post id

    const bookingRequest: BookingRequest = {
      clientId: mockClient[1].id,
      postId: postId,
      from: new Date("2023-01-22"),
      to: new Date("2023-01-24"),
    }

    try {
      await bookingUseCase.createBooking(bookingRequest)
    }
    catch(e) {
      expect((e as Error).message).toBe(`Invalid post id ${postId} doesn't exist`)
    }
  })

  test('the post is already booked', async () => {
    expect.assertions(1)

    const postId = "0"

    const bookingRequest: BookingRequest = {
      clientId: mockClient[1].id,
      postId: postId,
      from: new Date("2023-01-19"),
      to: new Date("2023-01-24"),
    }

    try {
      await bookingUseCase.createBooking(bookingRequest)
    }
    catch(e) {
      expect((e as Error).message).toBe(`Post Id ${postId} has been booked`)
    }
  })
})
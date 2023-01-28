import Booking from "../entities/Booking";

// mock in-memory database
let bookingList: Booking[] = [
  {
    id: "0",
    clientId: "0",
    postId: "0",
    from: new Date("2023-01-20"),
    to: new Date("2023-01-24"),
    status: "booked"
  }
]

class BookingRepository implements Repository<Booking> {
  getAll(): Promise<Booking[]> {
    return new Promise((reslove, reject) => {
      return reslove(bookingList)
    })
  }

  getById(id: string): Promise<Booking | undefined> {
    return new Promise((reslove, reject) => {
      return reslove(bookingList.find(booking => booking.id == id))
    })
  }

  create(item: Booking): Promise<void> {
    return new Promise((reslove, reject) => {
      bookingList.push(item)
    })
  }

  update(id: string, item: Booking): Promise<void> {
    return new Promise((reslove, reject) => {
      let booking = bookingList.find(booking => booking.id == id)
      if (booking == undefined) {
        reject(new Error(`Booking Id ${id} not found`))
      }

      booking = { ...item }
    })
  }

  delete(id: string): Promise<void> {
    return new Promise((reslove, reject) => {
      bookingList = bookingList.filter(booking => booking.id != id)
    })
  }
}

export default BookingRepository
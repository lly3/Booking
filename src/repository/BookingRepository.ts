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
  getAll(): Booking[] {
    return bookingList     
  }

  getById(id: string): Booking | undefined {
    return bookingList.find(booking => booking.id == id)
  }

  create(item: Booking): void {
    bookingList.push(item)
  }

  update(id: string, item: Booking): void {
    let booking = bookingList.find(booking => booking.id == id)
    if(booking == undefined) {
      throw new Error(`Booking Id ${id} not found`)
    }

    booking = {...item}
  }

  delete(id: string): void {
    bookingList = bookingList.filter(booking => booking.id != id)
  }
}

export default BookingRepository
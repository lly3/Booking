import Booking from "../entities/Booking";
import {Db, Collection} from 'mongodb'

class BookingRepository implements Repository<Booking> {
  bookingCollections?: Collection<Booking>

  constructor(db: Db) {
    const collection = "booking"
    this.bookingCollections = db.collection(collection)
  }

  async getAll(): Promise<Booking[]> {
    const bookingListDoc = await this.bookingCollections?.find({}).toArray()
    if(bookingListDoc == null) {
      return []
    }

    const bookingList = bookingListDoc?.map(bookingDoc => {
      return new Booking(
        bookingDoc.id,
        bookingDoc.clientId,
        bookingDoc.postId,
        bookingDoc.from,
        bookingDoc.to,
        bookingDoc.status,
      )
    })

    return bookingList
  }

  async getById(id: string): Promise<Booking | undefined> {
    const bookingDoc = await this.bookingCollections?.findOne({id: id})
    if(bookingDoc == null) {
      return
    }

    const booking = new Booking(
      bookingDoc.id,
      bookingDoc.clientId,
      bookingDoc.postId,
      bookingDoc.from,
      bookingDoc.to,
      bookingDoc.status,
    )

    return booking
  }

  async create(item: Booking): Promise<void> {
    this.bookingCollections?.insertOne(item)
  }

  async update(id: string, item: Booking): Promise<void> {
    this.bookingCollections?.updateOne({id: id}, {...item})
  }

  async delete(id: string): Promise<void> {
    this.bookingCollections?.deleteOne({id: id})
  }
}

export default BookingRepository
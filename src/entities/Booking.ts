
class Booking {
  id: string
  clientId: string
  postId: string
  from: Date
  to: Date
  status: "check-in" | "check-out" | "booked" | "cancel"

  constructor(id: string, clientId: string, postId: string, from: Date, to: Date, status: "check-in" | "check-out" | "booked" | "cancel") {
    this.id = id
    this.clientId = clientId
    this.postId = postId
    this.from = from
    this.to = to
    this.status = status
  }
}

export default Booking
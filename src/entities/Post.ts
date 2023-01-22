
export type Portion = {
  adults: Number
  child?: Number
}

class Post {
  id: string
  title: string
  detail: string
  location: string
  price: Number
  quantity: Number
  portion: Portion
  reviewScore: Number
  owner: string

  constructor(id: string, title: string, detail: string, location: string, price: Number, quantity: Number, portion: Portion, reviewScore: Number, owner: string) {
    this.id = id
    this.title = title
    this.detail = detail
    this.location = location
    this.price = price
    this.quantity = quantity
    this.portion = portion
    this.reviewScore = reviewScore
    this.owner = owner
  }
}

export default Post
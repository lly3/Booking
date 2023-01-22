
class Client {
  id: string
  name: string
  phone: string
  address: string

  constructor(id: string, name: string, phone: string, address: string) {
    this.id = id
    this.name = name
    this.phone = phone
    this.address = address
  }
}

export default Client
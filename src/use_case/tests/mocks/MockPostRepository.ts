import Post from "../../../entities/Post"

// mock in-memory database
let postList: Post[] = [
  {
    id: "0",
    title: "hello",
    detail: "world",
    location: "earth",
    price: 699,
    quantity: 2,
    portion: {
      adults: 1
    },
    reviewScore: 5.00,
    owner: "0",
  }
]

class MockPostRepository implements Repository<Post> {

  getAll(): Promise<Post[]> {
    return new Promise((reslove, reject) => {
      return reslove(postList)
    })
  }

  getById(id: string): Promise<Post | undefined> {
    return new Promise((reslove, reject) => {
      return reslove(postList.find(post => post.id == id))
    })
  }

  create(item: Post): Promise<void> {
    return new Promise((reslove, reject) => {
      postList.push(item)
    })
  }

  update(id: string, item: Post): Promise<void> {
    return new Promise((reslove, reject) => {
      let post = postList.find(post => post.id == id)
      if (post == undefined) {
        reject(new Error(`Post Id: ${id} not found`))
      }

      post = { ...item }
    })
  }

  delete(id: string): Promise<void> {
    return new Promise((reslove, reject) => {
      postList = postList.filter(post => post.id != id)
    })
  }
}

export default MockPostRepository
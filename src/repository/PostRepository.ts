import Post from "../entities/Post";

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

class PostRepository implements Repository<Post> {

  getAll(): Post[] {
    return postList
  }

  getById(id: string): Post | undefined {
    return postList.find(post => post.id == id)
  }

  create(item: Post): void {
    postList.push(item)
  }

  update(id: string, item: Post): void {
    let post = postList.find(post => post.id == id)
    if(post == undefined) {
      throw new Error(`Post Id: ${id} not found`)
    }

    post = { ...item }
  }

  delete(id: string): void {
    postList = postList.filter(post => post.id != id)
  }
}

export default PostRepository
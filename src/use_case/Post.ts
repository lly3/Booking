import Post, {Portion} from "../entities/Post"
import PostRepository from "../repository/PostRepository"
import { generatePostId } from "../utils/generateId"

type PostRequest = {
  title: string
  detail: string
  location: string
  price: Number
  quantity: Number
  portion: Portion
  owner: string
}

class PostUseCase {
  postRepository: PostRepository

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository
  }

  createPost(postRequest: PostRequest) {
    const post = new Post(
      generatePostId(),
      postRequest.title,
      postRequest.detail,
      postRequest.location,
      postRequest.price,
      postRequest.quantity,
      postRequest.portion,
      0,
      postRequest.owner,
    )

    this.postRepository.create(post)
  }

  allPost() {
    return this.postRepository.getAll()
  }
}

export default PostUseCase
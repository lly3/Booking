import { Request, Response } from "express"
import PostUseCase from "../../../use_case/Post"
import { Portion } from "../../../entities/Post"

export type CreatePostRequest = {
  title: string
  detail: string
  location: string
  price: Number
  quantity: Number
  portion: Portion
  owner: string
}

class PostController {
  postUseCase: PostUseCase

  constructor(postUseCase: PostUseCase) {
    this.postUseCase = postUseCase
  }

  createPost(req: Request, res: Response) {
    // validations things eg. authentication, validate form input

    // create post
    const postRequest: CreatePostRequest = {
      title: req.body.title,
      detail: req.body.detail,
      location: req.body.location,
      price: req.body.price,
      quantity: req.body.quantity,
      portion: {
        adults: req.body.adults,
        child: req.body.child,
      },
      owner: req.body.owner,
    }

    try {
      this.postUseCase.createPost(postRequest)
      res.sendStatus(201)
    }
    catch(e) {
      console.error(e)
      res.sendStatus(400)
    }
  }

  async allPost(req: Request, res: Response) {
    const posts = await this.postUseCase.allPost()
    res.json(posts)
  }
}

export default PostController
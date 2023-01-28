import Post from "../entities/Post";
import {Db, Collection} from 'mongodb'

class PostRepository implements Repository<Post> {
  postCollection?: Collection<Post>

  constructor(db: Db) {
    const collection = "post"
    this.postCollection = db.collection(collection)
  }

  async getAll(): Promise<Post[]> {
    const postsDoc = await this.postCollection?.find({}).toArray()
    if(postsDoc == null) {
      return []
    }

    const posts = postsDoc?.map(postDoc => {
      return new Post(
        postDoc.id,
        postDoc.title,
        postDoc.detail,
        postDoc.location,
        postDoc.price,
        postDoc.quantity,
        postDoc.portion,
        postDoc.reviewScore,
        postDoc.owner
      )
    }) 

    return posts
  }

  async getById(id: string): Promise<Post | undefined> {
    const postDoc = await this.postCollection?.findOne({id: id})
    if(postDoc == null) {
      return 
    }
    const post = new Post(
      postDoc.id,
      postDoc.title,
      postDoc.detail,
      postDoc.location,
      postDoc.price,
      postDoc.quantity,
      postDoc.portion,
      postDoc.reviewScore,
      postDoc.owner
    )

    return post
  }

  async create(item: Post): Promise<void> {
    this.postCollection?.insertOne(item)
  }

  async update(id: string, item: Post): Promise<void> {
    this.postCollection?.updateOne({id: id}, {...item})
  }

  async delete(id: string): Promise<void> {
    this.postCollection?.deleteOne({id: id})
  }
}

export default PostRepository
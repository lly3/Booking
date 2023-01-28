import ExpressServer from "./src/interface/express/ExpressServer";
import dotenv from 'dotenv'
import PostRepository from "./src/repository/PostRepository";
import BookingRepository from "./src/repository/BookingRepository";
import BookingUseCase from "./src/use_case/Booking";
import PostUseCase from "./src/use_case/Post";
import PostController from "./src/interface/express/controller/PostController";
import BookingController from "./src/interface/express/controller/BookingController";
import { MongoClient, Db } from "mongodb";

dotenv.config()

export type Config = {
  PORT: string,
  MONGO_URI: string,
  MONGO_DB: string,
}

const config: Config = {
  PORT: process.env.PORT || '3000',
  MONGO_URI: process.env.MONGO_URI || '',
  MONGO_DB: process.env.MONGO_DB || '',
}

const initMongoDBConnection = async (config: Config) => {
  const client = new MongoClient(config.MONGO_URI)
  await client.connect();
  const db: Db = client.db(process.env.MONGO_DB);
  return db
}

const initRepository = (db: Db) => {
  const postRepository = new PostRepository(db)
  const bookingRepository = new BookingRepository(db)

  return {postRepository, bookingRepository}
}

const initUseCase = (postRepository: PostRepository, bookingRepository: BookingRepository) => {
  const postUseCase = new PostUseCase(postRepository)
  const bookingUseCase = new BookingUseCase(bookingRepository, postRepository)

  return {postUseCase, bookingUseCase}
}

const initController = (postUseCase: PostUseCase, bookingUseCase: BookingUseCase) => {
  const postController = new PostController(postUseCase)
  const bookingController = new BookingController(bookingUseCase)

  return {postController, bookingController}
}

initMongoDBConnection(config).then(db => {
  const { postRepository, bookingRepository } = initRepository(db)
  const { postUseCase, bookingUseCase } = initUseCase(postRepository, bookingRepository)
  const { postController, bookingController } = initController(postUseCase, bookingUseCase)

  const express = new ExpressServer(postController, bookingController)
  express.setup()
  express.start(config)
})
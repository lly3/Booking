import ExpressServer, { ServerConfig } from "./src/interface/express/ExpressServer";
import dotenv from 'dotenv'
import PostRepository from "./src/repository/PostRepository";
import BookingRepository from "./src/repository/BookingRepository";
import BookingUseCase from "./src/use_case/Booking";
import PostUseCase from "./src/use_case/Post";
import PostController from "./src/interface/express/controller/PostController";
import BookingController from "./src/interface/express/controller/BookingController";

dotenv.config()

const config: ServerConfig = {
  port: process.env.PORT || '3000'
}

const initRepository = () => {
  const postRepository = new PostRepository()
  const bookingRepository = new BookingRepository()

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

const {postRepository, bookingRepository} = initRepository()
const {postUseCase, bookingUseCase} = initUseCase(postRepository, bookingRepository)
const {postController, bookingController} = initController(postUseCase, bookingUseCase)

const express = new ExpressServer(postController, bookingController)
express.setup()
express.start(config)
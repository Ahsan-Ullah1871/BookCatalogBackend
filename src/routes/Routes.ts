import express from 'express'
import { UserRoute } from '../app/modules/user/user.routes'
import { AuthRoute } from '../app/modules/auth/auth.route'
import { BookRoute } from '../app/modules/books/book.routes'
import { ReviewRoute } from '../app/modules/review/review.route'
import { WishRoute } from '../app/modules/wish/wish.route'
import { ReadingRoute } from '../app/modules/reading/reading.route'

const router = express.Router()

const all_routes = [
  { path: '/auth', router: AuthRoute },
  { path: '/users', router: UserRoute },
  { path: '/books', router: BookRoute },
  { path: '/reviews', router: ReviewRoute },
  { path: '/wish', router: WishRoute },
  { path: '/reading', router: ReadingRoute },
]

all_routes.map(item => router.use(item.path, item.router))

export default router

import express from "express";
import { UserRoute } from "../app/modules/user/user.routes";
import { AuthRoute } from "../app/modules/auth/auth.route";
import { CategoriesRoute } from "../app/modules/category/Category.routes";
import { BookRoute } from "../app/modules/books/book.routes";
import { OrderRoutes } from "../app/modules/order/Order.routes";

const router = express.Router();

const all_routes = [
	{ path: "/auth", router: AuthRoute },
	{ path: "/users", router: UserRoute },
	{ path: "/categories", router: CategoriesRoute },
	{ path: "/books", router: BookRoute },
	{ path: "/orders", router: OrderRoutes },
];

all_routes.map((item) => router.use(item.path, item.router));

export default router;


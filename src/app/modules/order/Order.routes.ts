import express from "express";
import { OrderController } from "./Order.controller";

import authHandler from "../../middlewares/authHandler";
import { UserRole } from "@prisma/client";
import requestValidationHandler from "../../middlewares/requestValidationHandler";
import { create_order_zod_schema } from "./Order.validation";

const router = express.Router();

router.post(
	"/create-order",
	authHandler(UserRole.customer),
	requestValidationHandler(create_order_zod_schema),
	OrderController.orderCreate
);

router.get("/", OrderController.AllOrdersList);
router.get("/:id", OrderController.orderDetails);

export const OrderRoutes = router;


import { Request, Response } from "express";
import httpStatus from "http-status";
import { OrderServices } from "./Order.services";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserRole } from "@prisma/client";

//  list
const AllOrdersList = catchAsync(async (req: Request, res: Response) => {
	const user_details = req.logged_in_user;

	let result;
	if (user_details?.role === UserRole.customer) {
		result = OrderServices.customer_all_orders_list(user_details);
	} else {
		result = await OrderServices.all_orders_list();
	}

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "All orders retrieved successfully",
	});
});

//  Details
const orderDetails = catchAsync(async (req: Request, res: Response) => {
	const { id: order_id } = req.params;
	const user_details = req.logged_in_user;

	const result = await OrderServices.order_details(order_id, user_details);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Order information retrieved successfully",
	});
});

//  create
const orderCreate = catchAsync(async (req: Request, res: Response) => {
	const { orderedBooks } = req.body;
	const user_data = req.logged_in_user;

	const result = await OrderServices.create_order(orderedBooks, user_data);

	sendResponse(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "Category created successfully",
	});
});

export const OrderController = {
	AllOrdersList,
	orderDetails,
	orderCreate,
};


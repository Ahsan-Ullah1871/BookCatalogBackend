import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { Order, OrderBook, Prisma, UserRole } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { JwtPayload } from "jsonwebtoken";
import { IOrderBook } from "./Order.interface";

//Order  list
const all_orders_list = async (): Promise<Partial<Order>[] | null> => {
	const orders = await prisma.order.findMany({
		include: {
			OrderBooks: {
				select: {
					bookId: true,
					quantity: true,
				},
			},
		},
	});
	return orders;
};

// Customer Order  list
const customer_all_orders_list = async (
	customer_details: JwtPayload
): Promise<Partial<Order>[] | null> => {
	// customer check
	const isCustomerAvailable = await prisma.user.findUnique({
		where: {
			id: customer_details?.userId,
			email: customer_details?.email,
		},
	});
	if (!isCustomerAvailable) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			"Customer not available"
		);
	}

	//
	const orders = await prisma.order.findMany({
		where: {
			userId: customer_details?.userId,
		},
		include: {
			OrderBooks: {
				select: {
					bookId: true,
					quantity: true,
				},
			},
		},
	});
	return orders;
};

// order_details
const order_details = async (
	order_id: string,
	user_details: JwtPayload
): Promise<Partial<Order> | null> => {
	//
	let where_condition: Prisma.OrderWhereUniqueInput = {
		id: order_id,
	};

	// checking is order id for exact customer
	if (user_details?.role === UserRole.customer) {
		where_condition.userId = user_details?.userId;
	}

	const orders = await prisma.order.findUnique({
		where: where_condition,
		include: {
			OrderBooks: {
				select: {
					bookId: true,
					quantity: true,
				},
			},
		},
	});
	return orders;
};

//create_order
const create_order = async (
	books_list: IOrderBook[],
	customer_details: JwtPayload
): Promise<Partial<Order> | null> => {
	// customer check
	const isCustomerAvailable = await prisma.user.findUnique({
		where: {
			id: customer_details?.userId,
			email: customer_details?.email,
		},
	});
	if (!isCustomerAvailable) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			"Customer not available"
		);
	}
	//
	if (books_list.length === 0) {
		throw new ApiError(
			httpStatus.BAD_REQUEST,
			"there have not any book item"
		);
	}

	// order works started from here

	const order_create = await prisma.$transaction(async (transaction) => {
		const order_result = await transaction.order.create({
			data: {
				userId: customer_details?.userId,
			},
		});

		const resp = await transaction.orderBook.createMany({
			data: books_list?.map((book) => ({
				...book,
				orderId: order_result?.id,
			})),
		});

		return order_result;
	});

	if (order_create) {
		const latest_order = await prisma.order.findUnique({
			where: { id: order_create?.id },
			include: {
				OrderBooks: {
					select: {
						bookId: true,
						quantity: true,
					},
				},
			},
		});

		return latest_order;
	}

	throw new ApiError(httpStatus.BAD_REQUEST, "Unable to create order");
};

export const OrderServices = {
	all_orders_list,
	customer_all_orders_list,
	order_details,
	create_order,
};


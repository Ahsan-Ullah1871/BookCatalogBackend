import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";

//Users  list
const users_list = async (): Promise<Partial<User>[] | null> => {
	const users = await prisma.user.findMany({
		select: {
			name: true,
			email: true,
			password: true,
			role: true,
			contactNo: true,
			address: true,
			profileImg: true,
		},
	});
	return users;
};

//Users  details
const users_details = async (id: string): Promise<Partial<User> | null> => {
	const user = await prisma.user.findUnique({
		where: {
			id,
		},
		select: {
			name: true,
			email: true,
			password: true,
			role: true,
			contactNo: true,
			address: true,
			profileImg: true,
		},
	});
	return user;
};

//Users  update
const users_update = async (
	id: string,
	user_data: User
): Promise<Partial<User> | null> => {
	const user = await prisma.user.update({
		where: {
			id,
		},

		data: user_data,
	});
	return user;
};
//Users  delete
const users_delete = async (id: string): Promise<Partial<User> | null> => {
	const user = await prisma.user.delete({
		where: {
			id,
		},
	});
	return user;
};

export const UserServices = {
	users_details,
	users_list,
	users_delete,
	users_update,
};


import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { AuthServices } from "./auth.services";
import { IUserLoginResponse } from "../user/user.interface";
import { User } from "@prisma/client";

// signup user
const signupUser = catchAsync(async (req: Request, res: Response) => {
	const { ...user_data } = req.body;
	const result = await AuthServices.user_signup(user_data);

	sendResponse<Partial<User>, null>(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "User signed up successfully",
	});
});

// login  user
const loginUser = catchAsync(async (req: Request, res: Response) => {
	const { ...user_data } = req.body;
	const result = await AuthServices.user_login(user_data);

	sendResponse<ILoginResponse, null>(res, {
		status_code: httpStatus.OK,
		success: true,
		data: result,
		message: "User logged in successfully",
	});
});

export const AuthController = {
	signupUser,
	loginUser,
};


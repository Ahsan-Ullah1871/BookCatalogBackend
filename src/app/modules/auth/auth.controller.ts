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

	const accessToken = result?.accessToken as string;
	const refreshToken = result?.refreshToken as string;
	const user_details = result?.user_details as Partial<User>;

	// cookies options
	const options = {
		httpOnly: true,
		secure: false,
	};

	res.cookie("refreshToken", refreshToken, options);

	sendResponse<IUserLoginResponse, null>(res, {
		status_code: httpStatus.OK,
		success: true,
		data: { accessToken, user_details },
		message: "User signed up successfully",
	});
});

export const AuthController = {
	signupUser,
};


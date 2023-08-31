import { jwtHelper } from "../../../helpers/jwtHelper";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IUserLoginResponse } from "../user/user.interface";

// Create new user
const user_signup = async (
	user_data: User
): Promise<IUserLoginResponse | null> => {
	const created_user = await prisma.user.create({
		data: user_data,
	});

	const userWithoutPassword: Partial<User> = created_user;
	delete userWithoutPassword.password;

	// access token
	const accessToken = jwtHelper.create_token(
		{
			id: userWithoutPassword?.id,
			email: userWithoutPassword?.email,
			role: userWithoutPassword?.role,
		},
		config.jwt.access_token_secret as Secret,
		config.jwt.access_token_expiresIn as string
	);
	// refresh token
	const refreshToken = jwtHelper.create_token(
		{
			id: userWithoutPassword?.id,
			email: userWithoutPassword?.email,
			role: userWithoutPassword?.role,
		},
		config.jwt.refresh_token_secret as Secret,
		config.jwt.refresh_token_expiresIn as string
	);

	return { accessToken, refreshToken, user_details: userWithoutPassword };
};

export const AuthServices = {
	user_signup,
};


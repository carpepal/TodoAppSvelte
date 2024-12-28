import container from '$lib/container';
import { UserService } from '$lib/services/User.service';
import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	login: async ({ cookies, request }) => {
		console.log('jajajajaaj login dice');
		const userService: UserService = container.resolve('UserService');
		const data = await request.formData();

		const email = data.get('email');

		if (!email || email === '' || typeof email !== 'string') {
			error(400, 'Email is required');
		}

		const user = await userService.logUser(email as string);
		console.log('user', user);
		if (!user) {
			error(404, 'User not found');
		}

		cookies.set('x-token', crypto.randomUUID(), {
			path: '/',
			httpOnly: true,
			maxAge: 3600
		});
		cookies.set('x-user', user.toDto().id, {
			path: '/',
			httpOnly: true,
			maxAge: 3600
		});

		redirect(303, '/board');
	},
	register: async ({ request }) => {
		console.log('jajajajaaj register dice');
		const userService: UserService = container.resolve('UserService');
		const data = await request.formData();

		const email = data.get('email');
		const name = data.get('name');

		if (!email || email === '' || typeof email !== 'string') {
			error(400, 'Email is required');
		}

		if (!name || name === '' || typeof name !== 'string') {
			error(400, 'Name is required');
		}

		const user = await userService.createNewUser(name as string, email as string);

		if (!user) {
			error(500, 'Error creating user');
		}

		return {
			status: 200,
			body: { ...user.toDto() }
		};
	}
} satisfies Actions;

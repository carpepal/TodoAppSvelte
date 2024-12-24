import container from '$lib/container';
import type { UserService } from '$lib/services/User.service';
import { ENV } from '$env/static/private';

export async function load() {
	// console.log(ENV);
	// console.log(container.registrations);
	const userService: UserService = container.resolve('UserService');
	// console.log(userService, container);

	const user = await userService.createNewUser('test', 'carpepal@gmail.com');

	console.log('user', user);
	return { ...user.toDto() };
}

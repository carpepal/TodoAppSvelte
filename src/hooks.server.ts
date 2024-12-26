import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	const { cookies, url, locals } = event;

	if (url.pathname !== '/login') {
		const token = cookies.get('x-token');
		if (!token) {
			throw redirect(303, '/login');
		} else {
			locals.user = {
				verified: true
			};
		}
	}
	if (cookies.get('x-token') && url.pathname === '/login') {
		throw redirect(303, '/board');
	}
	return await resolve(event);
}

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

//ignore any ts errors
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function handleErrors({ error, resolve }) {
	if (error.status === 401) {
		return {
			status: 401,
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({ message: 'Unauthorized' })
		};
	}
	return resolve(error);
}

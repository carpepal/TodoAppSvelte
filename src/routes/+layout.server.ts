import type { LayoutServerLoad } from './$types';

// export async function load({ locals }): LayoutServerLoad {
// 	return {
// 		user: {
// 			verified: locals.user?.verified || false
// 		}
// 	};
// }

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		user: {
			verified: locals.user?.verified || false
		}
	};
};

import container from '$lib/container';
import type { BoardService } from '$lib/services/Board.service';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const boardService: BoardService = container.resolve('BoardService');

	const userid = cookies.get('x-user');

	if (!userid) {
		return {
			status: 401,
			redirect: '/login'
		};
	}

	const boards = await boardService.getBoardByUserId(userid);

	console.log('boards', boards);

	return {
		boards: boards.map((board) => board.toDto())
	};
};

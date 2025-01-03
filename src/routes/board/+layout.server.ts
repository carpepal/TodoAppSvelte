import container from '$lib/container';
import type { BoardService } from '$lib/services/Board.service';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, params }) => {
	const boardService: BoardService = container.resolve('BoardService');

	const userid = cookies.get('x-user');

	const boards = await boardService.getBoardByUserId(userid!);
	const boardId = params.boardId as string;
	if (!boards.find((board) => board.toDto().id === boardId)) {
		redirect(303, `/board/${boards[0].id}`);
	}

	return {
		boards: boards.map((board) => board.toDto())
	};
};

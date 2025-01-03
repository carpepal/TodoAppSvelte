import container from '$lib/container';
import type { Task } from '$lib/domain/Task';
import type { BoardService } from '$lib/services/Board.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { boardId } = params;
	const boardService: BoardService = container.resolve('BoardService');

	const tasks = await boardService.getTasksByBoardId(boardId);

	return {
		tasks: tasks.map((task: Task) => {
			return task.toDto();
		})
	};
};

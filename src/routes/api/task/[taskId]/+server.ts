import container from '$lib/container';
import { Task, type TaskDto } from '$lib/domain/Task';
import type { BoardService } from '$lib/services/Board.service';
import type { RequestHandler } from './$types';

export const PATCH: RequestHandler = async ({ params, request, cookies }) => {
	const { taskId } = params;
	const userId = cookies.get('x-user');

	const task: TaskDto = await request.json();

	const boardService: BoardService = container.resolve('BoardService');

	const board = await boardService.getBoardByTaskId(taskId);

	console.log(board);

	if (!board) {
		return new Response(JSON.stringify({ message: 'Board not found' }), { status: 404 });
	}

	if (board.userId?.toString() !== userId) {
		return new Response(JSON.stringify({ message: 'Forbidden' }), { status: 403 });
	}

	try {
		boardService.updateTask(taskId, Task.from(task));
		return new Response(JSON.stringify(task), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ message: 'hubo un error inesperado' }), { status: 500 });
	}
};

export const DELETE: RequestHandler = async ({ params, cookies }) => {
	const { taskId } = params;
	const userId = cookies.get('x-user');

	const boardService: BoardService = container.resolve('BoardService');

	const board = await boardService.getBoardByTaskId(taskId);

	if (!board) {
		return new Response(JSON.stringify({ message: 'Board not found' }), { status: 404 });
	}

	if (board.userId?.toString() !== userId) {
		return new Response(JSON.stringify({ message: 'Forbidden' }), { status: 403 });
	}

	try {
		await boardService.deleteTask(taskId);
		return new Response(JSON.stringify({ message: 'Task deleted' }), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ message: 'hubo un error inesperado' }), { status: 500 });
	}
};

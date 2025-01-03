/* eslint-disable prefer-const */
import type { Task } from '$lib/domain/Task';
import { writable } from 'svelte/store';

export let tasks = writable<Task[]>([]);

export let taskId = writable<string | null>(null);

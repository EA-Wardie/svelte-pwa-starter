import { Dexie, type EntityTable } from 'dexie';
import { PUBLIC_DB_NAME } from '$env/static/public';

interface Todo {
	id: number;
	name: string;
}

const DB = new Dexie(PUBLIC_DB_NAME || '__app_db') as Dexie & {
	todos: EntityTable<Todo, 'id'>;
};

DB.version(1).stores({
	todos: '++id, name',
});

export { DB, type Todo };

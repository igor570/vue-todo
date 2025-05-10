export type Todo = Omit<FetchedTodo, 'userId'>;

export interface FetchedTodo {
  id: string;
  todo: string;
  completed: boolean;
  userId: number;
}

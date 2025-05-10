export type Todo = Omit<FetchedTodo, "userId">;

export interface FetchedTodo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

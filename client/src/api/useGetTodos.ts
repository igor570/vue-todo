import { useQuery } from '@tanstack/vue-query';
import type { FetchedTodo } from '../types/todos';

// Vue Query Function
export const useGetTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });
};

// Fetch Todos Function
const getTodos = async (): Promise<FetchedTodo[]> => {
  const response = await fetch('http://localhost:8080/todos');

  if (!response) throw new Error('Error fetching todo data from todo-API');

  const data = await response.json();

  return data.todos;
};

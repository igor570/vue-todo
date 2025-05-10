import { useQuery } from "@tanstack/vue-query";
import type { FetchedTodo } from "../types/todos";

// Vue Query Function
export const useGetTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
};

// Fetch Todos Function
const getTodos = async (): Promise<FetchedTodo[]> => {
  const response = await fetch("https://dummyjson.com/todos?limit=3");

  if (!response) throw new Error("Error fetching todo data from todo-API");

  const data = await response.json();

  return data.todos;
};

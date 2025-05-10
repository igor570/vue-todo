import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import type { Todo } from "../types/todos";

interface createTodoStore {
  todos: Ref<Todo[] | undefined>;
  setTodos: (newTodos: Todo[]) => void;
  addTodo: (message: string) => void;
  deleteTodo: (id: number) => void;
}

export const useTodoStore = defineStore("todos", (): createTodoStore => {
  //State - with initial value
  const todos = ref();

  //Actions - modifying state
  const setTodos = (newTodos: Todo[]) => {
    todos.value = newTodos;
  };

  const addTodo = (todo: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      todo,
      completed: false,
    };

    todos.value = [...todos.value, newTodo];
  };

  const deleteTodo = (id: number) => {
    todos.value = todos.value.filter((todo: { id: number }) => id !== todo.id);
  };

  return { todos, setTodos, addTodo, deleteTodo };
});

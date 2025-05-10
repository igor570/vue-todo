<script setup lang="ts">
import { ref, watch } from "vue";
import { useGetTodos } from "./api/useGetTodos";
import { useTodoStore } from "./store/useTodoStore";
import { storeToRefs } from "pinia";
import Todo from "./components/Todo.vue";

// Vue-Query fetch -> Grab todos from API
const { data: fetchedTodos, isLoading, error } = useGetTodos();

//Store state (Pinia)
const store = useTodoStore();
const { todos } = storeToRefs(store);
const { setTodos, addTodo } = store;

//Local State
const newMessage = ref("");

// Effect: Watch for changes in fetchedTodos and update the store
watch(fetchedTodos, (newTodos) => {
  if (newTodos) setTodos(newTodos);
});

const handleSubmit = () => addTodo(newMessage.value);
</script>

<template>
  <main class="todo-app">
    <!-- Loading and Error States -->
    <div v-if="isLoading">Loading todos...</div>
    <div v-else-if="error">Error loading todos: {{ error.message }}</div>

    <!-- Little form here to add a todo -->
    <section v-else class="submit-todo">
      <label for="message">Message: </label>
      <input type="text" v-model="newMessage" name="message" />

      <button type="submit" @click="handleSubmit">Add todo</button>
    </section>

    <!-- The todos -->
    <div class="todos" v-if="todos">
      <div v-for="todo in todos" :key="todo.id">
        <Todo :id="todo.id" :todo="todo.todo" />
      </div>
    </div>
  </main>
</template>

<style scoped>
.todo-app {
  display: flex;
  gap: 50px;
}

.todos {
  display: flex;
  gap: 15px;
  flex-direction: column;
}

.submit-todo {
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  gap: 10px;
}
</style>

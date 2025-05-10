<script setup lang="ts">
import { ref } from 'vue';
import { useTodoStore } from '../store/useTodoStore';

interface TodoProps {
  id: string;
  todo: string;
}

const { id, todo } = defineProps<TodoProps>();

//Store State
const store = useTodoStore();
const { deleteTodo } = store;

//Local state
const isChecked = ref(false);

/*
 -> Old solution, now delete is handled in store
 const emit = defineEmits(["deleteTodo"]);
const handleDelete = () => emit("deleteTodo", id); 
*/

const handleDelete = () => {
  deleteTodo(id);
};
</script>

<template>
  <div class="todo" :key="id">
    <div :class="{ 'strike-through': isChecked }">{{ todo }}</div>
    <input type="checkbox" class="inputbox" v-model="isChecked" />
    <div class="delete" @click="handleDelete">X</div>
  </div>
</template>

<style scoped>
.todo {
  display: flex;
}

.delete {
  align-self: last baseline;
  margin-left: 10px;
  &:hover {
    cursor: pointer;
    color: red;
  }
}

.inputbox {
  align-self: last baseline;
  margin-left: 10px;
}

.strike-through {
  text-decoration: line-through;
}
</style>

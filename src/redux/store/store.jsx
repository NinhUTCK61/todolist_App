import todoListSlice from '../../component/TodoApp/TodoList/todoSlice'
import { configureStore } from '@reduxjs/toolkit'
export const store = configureStore({
    reducer:{
        todoList: todoListSlice.reducer
    }
})

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import { db } from "../../../firebase/firebaseConfig";
import { getQueryData } from "../../../getDataFirestore/getDataFirestore";

export default createSlice({
    name: 'todoList',
    initialState: {
        status: 'idle',
        todos: []
    },
    reducers: {
        addTodo: (state, action)=>{
            state.todos = [...action.payload]
        },

        updateTodo: (state, action)=>{
            const todo = state.find((todo)=>{
                return todo.id === action.payload.id
            })
            if(todo){
                todo.title = action.payload.title;
                todo.content = action.payload.content;
                todo.priority = action.payload.priority;
                todo.rank = action.payload.rank;
            }
            state.sort((a, b)=>(b.rank - a.rank))
        },
 
        deleteTodoItem: (state, action)=>{
            state.map((todo, index)=>(
                (todo.id === action.payload.id) ? state.splice(index, 1) : state
            )) 
        },
        
        clearTodoList: (state, action)=>{
            state.splice(0, state.length)
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchData.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.todos = action.payload
           
        })
        .addCase(addNewTodo.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.todos = [...action.payload]
            
        })
        .addCase(updateTodo.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.todos = action.payload
            
        })
        .addCase(deleteTodo.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.todos = action.payload
            
        })
        .addCase(completedTodo.fulfilled,(state, action)=>{
            state.status = 'idle'
            state.todos = action.payload
        })
    }
});

export const fetchData = createAsyncThunk("todo/fetchData", async(user)=>{
    const condition = {
        fielName: "uid",
        operator: "==",
        compareValue: user.uid
    }
    const resultData = getQueryData("todoList", condition);
    return resultData
})

export const addNewTodo = createAsyncThunk('todo/addNewTodos', async(todo)=>{
    await addDoc(collection(db, "todoList"), {
        uid: todo.uid,
        title: todo.title,
        content: todo.content, 
        priority: todo.priority,
        rank: todo.rank,
        completed: false,
        createdAt : todo.createdAt
    })
    const condition = {
        fielName: "uid",
        operator: "==",
        compareValue: todo.uid
    }
    const resultData = getQueryData("todoList", condition);
    return resultData
})

export const updateTodo = createAsyncThunk('todo/updateTodos', async(todo)=>{
    const dbRef = doc(db,`todoList/${todo.id}`);
    await updateDoc(dbRef,{
        title: todo.title,
        content: todo.content, 
        priority: todo.priority,
        rank: todo.rank,
    })
    const condition = {
        fielName: "uid",
        operator: "==",
        compareValue: todo.uid
    }
    const resultData = getQueryData("todoList", condition);
    return resultData
})

export const deleteTodo = createAsyncThunk("todo/deleteTodo", async(todo)=>{
    await deleteDoc(doc(db,`todoList/${todo.id}`))
    const condition = {
        fielName: "uid",
        operator: "==",
        compareValue: todo.uid
    }
    const resultData = getQueryData("todoList", condition);
    return resultData
})

export const completedTodo = createAsyncThunk("todo/completedTodo", async(todo)=>{
    await updateDoc(doc(db,`todoList/${todo.id}`),{
        completed: todo.completed,
    })

    const condition = {
        fielName: "uid",
        operator: "==",
        compareValue: todo.uid
    }
    const resultData = getQueryData("todoList", condition);
    return resultData
})
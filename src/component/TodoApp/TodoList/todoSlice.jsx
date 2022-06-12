import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from "../../../firebase/firebaseConfig";
export default createSlice({
    name: 'todoList',
    initialState: {
        status: 'idle',
        todos: []
    },
    reducers: {
        addTodo: (state, action)=>{
            state.push(action.payload);
            state.sort((a, b)=>(b.rank - a.rank))
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
            state.todos.sort((a, b)=>(b.rank - a.rank))
        })
        .addCase(addNewTodo.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.todos = action.payload
            state.todos.sort((a, b)=>(b.rank - a.rank))
        })
        .addCase(updateNewTodo.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.todos = action.payload
            state.todos.sort((a, b)=>(b.rank - a.rank))
        })
        .addCase(deleteNewtodo.fulfilled, (state, action)=>{
            state.status = 'idle'
            state.todos = action.payload
            state.todos.sort((a, b)=>(b.rank - a.rank))
        })
    }
});

export const fetchData = createAsyncThunk("todo/fetchData", async(user)=>{
    const dbRef = doc(db,`users/${user.email}`);
    const dataRequire = await getDoc(dbRef)
    return dataRequire.data().todoList
})

export const addNewTodo = createAsyncThunk('todo/addNewTodos', async(todo)=>{
    const dbRef = doc(db,`users/${todo.email}`);
    const data = await getDoc(dbRef)
    
    if(data.exists())
    {
        await updateDoc(doc(db, "users", todo.email),{
            todoList: arrayUnion(todo)
        })
    }else
    {
        await setDoc(doc(db, "users", todo.email),{
            todoList: arrayUnion(todo)
        })
    }
    const dataRequire = await getDoc(dbRef)
    return dataRequire.data().todoList
})

export const updateNewTodo = createAsyncThunk('todo/updateNewTodos', async(todoObj)=>{
    const dbRef = doc(db,`users/${todoObj.todo.email}`);
    await updateDoc(dbRef,{
        todoList: arrayRemove(todoObj.objTodoPrev),
    })
    
    await updateDoc(dbRef,{
        todoList: arrayUnion(todoObj.todo)
    })
    
    const dataRequire = await getDoc(doc(db,`users/${todoObj.todo.email}`))
    return dataRequire.data().todoList
})

export const deleteNewtodo = createAsyncThunk("todo/deleteNewTodo", async(todo)=>{
    await updateDoc(doc(db, "users", todo.email),{
        todoList: arrayRemove(todo)
    })
    const dataRequire = await getDoc(doc(db,`users/${todo.email}`))
    return dataRequire.data().todoList
})
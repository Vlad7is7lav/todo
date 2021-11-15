import { createSlice } from '@reduxjs/toolkit';


export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: []
    },
    reducers: {
        saveTask: (state, action) => {
            state.todos.push(action.payload);
            return state
        },

        updateTask: (state, action) => {
            let pos = state.todos.findIndex((el, i) => el.name === action.payload.oldname);
            if(pos !== -1) {
                let {oldname, ...res} = action.payload;
                state.todos[pos] = res
            }
        },

        deleteTask: (state, action) => {
            console.log(action.payload)
            let pos = state.todos.findIndex((el, i) => el.name == action.payload);
            if(pos !== -1) {
                state.todos.splice(pos, 1)
            }
            return state
        },

        completeTask: (state, action) => {
            
            state.todos.map((el) => {
              if (el.name == action.payload) {
                el.completed = !el.completed 
              }
              return el;
            });
            return state
          }
    }
})


export const { saveTask, updateTask, deleteTask, completeTask } = todoSlice.actions

export const selectTodos = state => state.todo.todos

export default todoSlice.reducer
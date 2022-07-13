import {createSlice} from '@reduxjs/toolkit'

interface ITaskFields {
    Text: string
    Status: 'Todo' | 'Done' | string
    Tags: string[]
}

export interface ITask {
    id: string
    createdTime: string
    fields: ITaskFields
}

interface IState {
    tasks: ITask[]
    filter: string
}

const initialState: IState = {
    tasks: [],
    filter: ''
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        putTasks: (state, action) => {
            state.tasks = action.payload;
        },

        pushTasks: (state, action) => {
            state.tasks.unshift(action.payload);
        },

        putFilter: (state, action) => {
            const query = action.payload;
            state.filter = query;
        },

        removeTask: (state, action) => {
            const id = action.payload;
            state.tasks = state.tasks.filter(task => task.id !== id);
        },

        putTaskComplete: (state, action) => {
            const {id, complete} = action.payload;
            const task = state.tasks.filter(task => task.id === id)[0];
            task.fields.Status = complete ? 'Done' : 'Todo';
            state.tasks = [...state.tasks];
        },

        putTaskTags: (state, action) => {
            const {id, tags} = action.payload;
            const task = state.tasks.filter(task => task.id === id)[0];
            task.fields.Tags = tags;
            state.tasks = [...state.tasks];
        },


    },
});

// Action creators are generated for each case reducer function
export const {putTasks, putFilter, pushTasks, removeTask, putTaskTags, putTaskComplete} = tasksSlice.actions;

export default tasksSlice.reducer;
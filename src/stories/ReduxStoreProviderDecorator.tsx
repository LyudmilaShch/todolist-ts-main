import {tasksReducer, todolistsReducer} from "../features/todoLists";
import React from 'react';
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {v1} from 'uuid'
import {appReducer} from "../features/Application";
import thunk from "redux-thunk";
import {authReducer} from "../features/Auth";
import {BrowserRouter} from "react-router-dom";
import {AppRootStateType, RootReducerType} from "../utils/types";
import {TaskPriorities, TaskStatuses } from "../api/types";


const rootReducer: RootReducerType = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState = {
    todoLists:[
        {id: 'todolistId1', title: "What to learn", filter: "all", order: 0, addedDate: "", entityStatus: "idle"},
        {id: 'todolistId2', title: "What to buy", filter: "all", order: 0, addedDate: "", entityStatus: "loading"}
    ],
    tasks:
        {
            ['todolistId1']: [
                {id: v1(), title: 'CSS', status: TaskStatuses.New, priority: TaskPriorities.Low,
                    startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId1' },
                {id: v1(), title: 'JS', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                    startDate: '', deadline: '', description: '', completed: true, addedDate: '', order: 0, todoListId:'todolistId2' },
                {id: v1(), title: 'React', status: TaskStatuses.New, priority: TaskPriorities.Low,
                    startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId3' },
            ],
            ['todolistId2']: [
                {id: v1(), title: 'CSS', status: TaskStatuses.New, priority: TaskPriorities.Low,
                    startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId1' },
                {id: v1(), title: 'JS', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                    startDate: '', deadline: '', description: '', completed: true, addedDate: '', order: 0, todoListId:'todolistId2' },
                {id: v1(), title: 'React', status: TaskStatuses.New, priority: TaskPriorities.Low,
                    startDate: '', deadline: '', description: '', completed: false, addedDate: '', order: 0, todoListId:'todolistId3' },
            ]
        },
    app: {
        status: 'succeeded',
        error: null,
        isInitialized: true
    },
    auth: {
        isLoginIn: true
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)

export const BrowserRouterDecorator = (storyFn: any) => (
    <BrowserRouter>
        {storyFn()}
    </BrowserRouter>)

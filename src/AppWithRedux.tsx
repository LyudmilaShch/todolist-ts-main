import React, {useReducer, useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import IconButton from '@material-ui/core/IconButton/IconButton';
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
    id: string
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithRedux() {
    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
    const tasksObj = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    function removeTask(todolistId: string, id: string) {
        const action = removeTaskAC(id, todolistId);
        dispatch(action)
    }

    function addTask(todolistId: string, title: string) {
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        const action = changeTaskStatusAC(taskId, isDone, todolistId);
        dispatch(action);
    }

    function changeTaskTitle(id: string, newValue: string, todolistId: string) {
        dispatch(changeTaskTitleAC(id, newValue, todolistId));
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        dispatch(changeTodolistFilterAC(value, todolistId));
    }

    let removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }

    let changeTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(newTitle, todolistId))
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    return (

        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl) => {

                        let tasksForTodolist = tasksObj[tl.id];
                        if (tl.filter === "completed") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                        }
                        if (tl.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                        }

                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist title={tl.title}
                                          key={tl.id}
                                          todolistId={tl.id}
                                          xz={100200}
                                          tasks={tasksForTodolist}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeTasksStatus={changeStatus}
                                          changeTasksTitle={changeTaskTitle}
                                          filter={tl.filter}
                                          removeTodolist={removeTodolist}
                                          changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>

                    })}
                </Grid>

                {/* <Todolist title={title2} tasksObj={tasks2}/>*/
                }
            </Container>
        </div>
    )
        ;
}


export default AppWithRedux;
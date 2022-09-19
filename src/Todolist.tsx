import React from 'react';
import './App.css';
import {FilterValuesType} from "./App";

export type TodolistProps = {
    title: string,
    xz?: number,
    tasks: Array<TasksType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}

export type TasksType = {
    id: number,
    title: string,
    isDone: boolean,
    newValue: boolean
}


export const Todolist = (props: TodolistProps) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(t => <li><input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => {
                            props.removeTask(t.id)
                        }}>x
                        </button>
                    </li>)
                }
            </ul>
            <div>
                <button onClick={() => {props.changeFilter("all")}}>All</button>
                <button onClick={() => {props.changeFilter("active")}}>Active</button>
                <button onClick={() => {props.changeFilter("completed")}}>Completed</button>
            </div>
        </div>
    );
}



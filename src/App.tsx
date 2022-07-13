import React from 'react';
import './App.css';
import {styled} from "@mui/system";
import {FilterInput} from "./components/filterInput";
import {TasksList} from "./components/tasks-list";
import {NewTaskInput} from './components/newTaskInput';

const StyledContainer = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 700,
    margin: 'auto',
    padding: 10
}));

export const App = () => {
    return <StyledContainer>
        <FilterInput/>
        <TasksList/>
        <NewTaskInput/>
    </StyledContainer>;
};
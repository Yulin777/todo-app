import React, {FC} from 'react';
import {IconButton, Paper} from "@mui/material";
import {styled} from "@mui/system";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {AddTagInput} from "./AddTagInput";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import {useDispatch} from "react-redux";
import {TaskTags} from "./Tags";

const StyledContainer = styled(Paper)(() => ({
    height: 130,
    display: 'flex',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    background: 'blanchedalmond'
}));

const StyledLowerContainer = styled('div')(() => ({
    gap: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
}));

const StyledUpperContainer = styled('div')(() => ({
    height: '50%',
    gap: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
}));

const StyledCheckbox = styled(Checkbox)(() => ({
    'svg': {
        height: 50,
        width: 50
    },
    'span': {
        fontSize: 20
    }
}));

const StyledDeleteButton = styled(IconButton)(() => ({
    padding: 0,
    'svg': {
        height: 50,
        width: 50
    }
}));

interface IProps {
    id: string
    text: string
    status: string
    tags: string[]
}

export const TaskItem: FC<IProps> = ({id, text, status}) => {
    const dispatch = useDispatch();

    const handleTaskToggle = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        dispatch({type: 'SET_TASK_COMPLETE', id, complete: checked});
    };

    const deleteTask = () => {
        dispatch({type: 'DELETE_TASK', id})
    };

    return <StyledContainer elevation={2}>
        <StyledUpperContainer>
            <FormControlLabel control={<StyledCheckbox checked={status === 'Done'}
                                                       onChange={handleTaskToggle}/>}
                              label={text}/>
            <StyledDeleteButton size='large' onClick={deleteTask}>
                <DeleteOutlinedIcon/>
            </StyledDeleteButton>

        </StyledUpperContainer>

        <StyledLowerContainer>
            <TaskTags id={id}/>
            <AddTagInput id={id}/>
        </StyledLowerContainer>
    </StyledContainer>;
};
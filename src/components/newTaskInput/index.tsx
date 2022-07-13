import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import React, {FC, useState} from 'react';
import {InputAdornment, OutlinedInput} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {styled} from "@mui/system";
import {useDispatch} from "react-redux";

const StyledContainer = styled(FormControl)(() => ({
    m: 1,
    width: '100%'
}));

export const NewTaskInput: FC = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (e.key === 'Enter') {
            dispatch({type: 'ADD_TASK', text: value});
            setValue('');
        }
    };

    return <StyledContainer variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Add new task, store on enter</InputLabel>
        <OutlinedInput
            value={value}
            onChange={handleChange}
            onKeyUp={handleSubmit}
            endAdornment={<InputAdornment position="end"><AddIcon/></InputAdornment>}
            label="Add new task, store on enter"
        />
    </StyledContainer>;
};
import React, {FC, useState} from 'react';
import {TextField} from "@mui/material";
import {styled} from "@mui/system";
import {useDispatch} from "react-redux";

const StyledInput = styled(TextField)(() => ({
    width: '30%',

    'input': {
        background: 'white'
    }
}));

interface IProps {
    id: string
}

export const AddTagInput: FC<IProps> = ({id}) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(e.target.value);
    };
    const handleSubmit = (e: any) => {
        if (e.nativeEvent.key === 'Enter') {
            dispatch({type: 'ADD_TAG', id, tag: value});
            setValue('');
        }
    };

    return <StyledInput label="add new tag"
                        onChange={handleChange}
                        value={value}
                        variant="outlined"
                        onKeyUp={handleSubmit}
                        size='small'/>;
};
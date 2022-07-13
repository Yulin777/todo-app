import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import React, {FC, useState} from 'react';
import {InputAdornment, OutlinedInput} from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {styled} from "@mui/system";
import {useDispatch} from "react-redux";
import {putFilter} from "../../state/reducers";

const StyledContainer = styled(FormControl)(() => ({
    m: 1,
    width: '100%'
}));

export const FilterInput: FC = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState('');

    const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const query = e.target.value;
        setValue(query);
        dispatch(putFilter(query));
    };

    return <StyledContainer variant="outlined">
        <InputLabel >Filter by tag</InputLabel>
        <OutlinedInput
            value={value}
            onChange={handleQueryChange}
            endAdornment={
                <InputAdornment position="end">
                    <FilterAltIcon/>
                </InputAdornment>
            }
            label="Filter by tag"
        />
    </StyledContainer>;
};
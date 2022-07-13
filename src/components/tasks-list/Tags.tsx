import React, {FC, useMemo} from 'react';
import {useSelector} from "react-redux";
import {ITask} from "../../state/reducers";
import {Chip} from "@mui/material";
import {styled} from "@mui/system";

const StyledTagsContainer = styled('div')(() => ({
    width: '70%',
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    overflowX: 'scroll',
    alignSelf: 'end'
}));

interface IProps {
    id: string
}

export const TaskTags: FC<IProps> = ({id}) => {
    const tasks = useSelector((state: any) => state.tasks.tasks) as ITask[];

    const tags = useMemo(() => {
        const task = tasks.filter(task => task.id === id)[0];
        return task?.fields?.Tags || [];
    }, [id, tasks]);

    return <StyledTagsContainer>  {
        tags.map(tag => <Chip key={`${id}-${tag}`}
                              label={tag}
                              color={'info'}/>)
    }
    </StyledTagsContainer>
};
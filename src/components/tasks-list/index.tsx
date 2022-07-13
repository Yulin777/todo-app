import React, {FC, useEffect, useMemo} from 'react';
import {styled} from "@mui/system";
import {TaskItem} from "./TaskItem";
import {useDispatch, useSelector} from 'react-redux';
import {ITask} from "../../state/reducers";

const StyledContainer = styled('div')(() => ({
    display: 'flex',
    gap: 10,
    flexDirection: 'column',
    margin: '15px 0',
    maxHeight: '80vh',
    overflowY: 'scroll',
    padding: 3
}));

export const TasksList: FC = () => {
    const dispatch = useDispatch();
    const allTasks = useSelector((state: any) => state.tasks.tasks) as ITask[];
    const filter = useSelector((state: any) => state.tasks.filter) as string;

    const filteredTasks = useMemo(() => {
        if (!filter) return allTasks;

        return allTasks.filter(task => {
            let match = false;

            task.fields.Tags.forEach(tag => {
                if (tag.includes(filter)) {
                    match = true;
                }
            });

            return match;
        });
    }, [filter, allTasks]);

    useEffect(() => {
        dispatch({type: 'GET_TASKS'});
    }, [dispatch]);

    return <StyledContainer>
        {
            filteredTasks.map(task => <TaskItem
                key={task.id}
                id={task.id}
                text={task.fields.Text}
                status={task.fields.Status}
                tags={task.fields.Tags}/>)
        }
    </StyledContainer>;
};
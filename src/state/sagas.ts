import {all, put, call, takeLatest, select} from 'redux-saga/effects'
import * as Api from '../api'
import {ITask, pushTasks, putTaskComplete, putTasks, putTaskTags, removeTask} from "./reducers";

function* getTasks() {
    try {
        // @ts-ignore
        const response = yield call(Api.requestTasks);
        const tasks = response.data.records;
        tasks.sort((a :ITask,b :ITask) => a.createdTime > b.createdTime);
        yield put(putTasks(tasks));
    } catch (e: any) {
        console.log(e);
    }
}

function* addTask({text}: any) {
    try {
        const body = {
            records: [{
                fields: {
                    Status: 'Todo',
                    Tags: [],
                    Text: text
                }
            }]
        };

        // @ts-ignore
        const response = yield call(Api.addTask, body);
        yield put(pushTasks(response.data.records[0]));
    } catch (e: any) {
        console.log(e);
    }
}

function* addTag({tag, id}: any) {
    // @ts-ignore
    const state = yield select();
    const oldTags = state.tasks.tasks.filter((task :ITask) => task.id === id)[0].fields.Tags;

    try {
        const body = {
            records: [{
                id,
                fields: {
                    Tags: [tag, oldTags]
                }
            }]
        };

        // @ts-ignore
        yield call(Api.updateTask, body);
        yield put(putTaskTags({id,  tags: [tag, ...oldTags]}));
    } catch (e: any) {
        console.log(e);
    }
}

function* completeTask({id, complete}: any) {
    try {
        const body = {
            records: [{
                id,
                fields: {
                    Status: complete ? 'Done' : 'Todo',
                }
            }]
        };

        // @ts-ignore
        yield call(Api.updateTask, body);
        yield put(putTaskComplete({id, complete}));
    } catch (e: any) {
        console.log(e);
    }
}

function* deleteTask({id}: any) {
    try {
        // @ts-ignore
        yield call(Api.deleteTask, id);
        yield put(removeTask(id));
    } catch (e: any) {
        console.log(e);
    }
}

function* watchGetTasks() {
    yield takeLatest('GET_TASKS', getTasks);
}

function* watchAddTask() {
    yield takeLatest('ADD_TASK', addTask);
}

function* watchAddTag() {
    yield takeLatest('ADD_TAG', addTag);
}

function* watchCompleteTask() {
    yield takeLatest('SET_TASK_COMPLETE', completeTask);
}

function* watchDeleteTask() {
    yield takeLatest('DELETE_TASK', deleteTask);
}

export default function* rootSaga() {
    yield all([
        watchGetTasks(),
        watchAddTask(),
        watchAddTag(),
        watchCompleteTask(),
        watchDeleteTask(),
    ]);
}
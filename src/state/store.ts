import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
    reducer: {
        tasks: tasksSlice,
    },
    middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

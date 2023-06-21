import {configureStore, Reducer} from '@reduxjs/toolkit'
import {combineReducers,applyMiddleware} from 'redux'
import {persistReducer,persistStore} from 'redux-persist'
import * as rp from 'redux-persist'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage';
import loginReducer from './slices/login';
import appDataReducer from '../redux/slices/appData'
 import casteReducer from './slices/caste'
 import registrationReducer from './slices/registration'
import locationReducer from './slices/location'
import personalReducer from './slices/personal'
import educationReducer from './slices/education'
import familyReducer from './slices/family'
import matcheReducer from './slices/matches'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const reducers=combineReducers({
    loginId: loginReducer,
    appData:appDataReducer,
    religion:casteReducer,
    registration:registrationReducer,
    location:locationReducer,
    personal:personalReducer,
    education:educationReducer,
    family:familyReducer,
    matches:matcheReducer

})
const persistConfig={
    key:'root',
    storage,
    //stateReconciler: hardSet,
    //whitelist:['flags'],
    stateReconciles: hardSet as (inboundState: CombinedState) => CombinedState,
   // whitelist: ['navigation'],
}
type CombinedState = typeof rootReducer extends Reducer<infer U, any> ? U : never
const rootReducer=(state:any,action:any)=>{
    return reducers(state,action)
};
const persistedReducer=persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [rp.FLUSH, rp.REHYDRATE, rp.PAUSE, rp.PERSIST, rp.PURGE, rp.REGISTER],
    },
  }),
});

export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
export default store;
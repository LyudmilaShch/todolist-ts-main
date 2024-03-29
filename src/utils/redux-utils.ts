import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatchType, AppRootStateType} from "./types";
import {store} from "../app/store";
import {ActionCreatorsMapObject, bindActionCreators} from "redux";
import {useMemo} from "react";
export const useAppDispatch = () => useDispatch<AppDispatchType>()

//все типы экшенов для всего app
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T){
    const dispatch = useAppDispatch()
    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch)
    }, [])

    return boundActions
}
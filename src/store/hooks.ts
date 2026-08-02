import {useDispatch, useSelector} from "react-redux";
import type {TypedUseSelectorHook} from "react-redux";
import type {RootState, AppDispatch} from "./store";

// Typed versions of Redux hooks
export const useAppDispatch =
  useDispatch.withTypes<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector;
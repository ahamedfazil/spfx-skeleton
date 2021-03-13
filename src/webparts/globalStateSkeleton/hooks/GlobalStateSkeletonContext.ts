import { createContext } from 'react';
import { IGlobalStateSkeletonContext, IGlobalStateSkeletonState } from '../interfaces/IGlobalStateSkeleton';
import { GlobalStateSkeletonAction } from './GlobalStateSkeletonReducer';

export const GlobalStateSkeletonContext = createContext<{
    globalStateSkeletonContext: IGlobalStateSkeletonContext}>({
    globalStateSkeletonContext: undefined
});
export const StateContext = createContext<IGlobalStateSkeletonState>(undefined);
export const DispatchContext = createContext<React.Dispatch<GlobalStateSkeletonAction>>(undefined);
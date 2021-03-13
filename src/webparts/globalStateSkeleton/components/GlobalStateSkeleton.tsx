import * as React from 'react';
import { ContextDevTool } from 'react-context-devtool';
import styles from './GlobalStateSkeleton.module.scss';
import { DispatchContext, StateContext } from '../hooks/GlobalStateSkeletonContext';
import { useImmerReducer } from 'use-immer';
import { GlobalStateSkeletonReducer } from '../hooks/GlobalStateSkeletonReducer';
import { initialState } from '../hooks/InitialState';
import Dummy from './dummy/Dummy';

const GlobalStateSkeleton: React.FC = (): JSX.Element => {
  // Immer, for handy state management, easy way to work with immutable state,
  //https://immerjs.github.io/immer/docs/introduction
  //https://immerjs.github.io/immer/docs/example-reducer
  const [globalStateSkeletonState, dispatch] = useImmerReducer(GlobalStateSkeletonReducer, initialState);

  return <>
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={globalStateSkeletonState}>
        {/* For Dev purpose - works with chrome extention "React Context DevTool"(https://chrome.google.com/webstore/detail/react-context-devtool/oddhnidmicpefilikhgeagedibnefkcf) */}
        <ContextDevTool context={StateContext} id="GlobalStateSkeletonContext" displayName="GlobalStateSkeleton Context" />
        <div className={styles.globalStateSkeleton}>
          Here goes all your compoenents
          <Dummy />
          {/* 
          <Header/>
          <MainFunctionality/>
          <Footer/> 
          */}
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  </>;
};

export default GlobalStateSkeleton;

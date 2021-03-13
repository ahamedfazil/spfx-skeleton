import * as React from 'react';
import { useContext } from 'react';
import styles from './Dummy.module.scss';
import { DisplayMode } from '@microsoft/sp-core-library';
import { DispatchContext, GlobalStateSkeletonContext, StateContext } from '../../hooks/GlobalStateSkeletonContext';
import { TextField } from 'office-ui-fabric-react';

const Dummy: React.FC = (): JSX.Element => {
    const dispatch = useContext(DispatchContext);
    // webpart context, properties and things that you mentioned in GlobalStateSkeletonWebPart.tsx
    const { globalStateSkeletonContext } = useContext(GlobalStateSkeletonContext);
    // state that are required for your webpart
    const { formTitle } = useContext(StateContext);

    //In case you need to have webpart context and to make api call
    // useEffect ->     globalStateSkeletonContext.webpartContext
    return <>
        <div className={styles.dummy}>
            {formTitle}
            <TextField value={formTitle} label="Dummy Text"
                onChange={(e, v) => dispatch({ type: "set_title", title: v })}
            />
            Description from property: {globalStateSkeletonContext.properties.description}
            {globalStateSkeletonContext.displayMode === DisplayMode.Read &&
                <div>
                    Hello you are in display  more
                </div>}
        </div>
    </>;

};

export default Dummy;

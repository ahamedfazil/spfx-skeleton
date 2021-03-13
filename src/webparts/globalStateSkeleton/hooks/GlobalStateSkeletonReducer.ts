import { Draft } from "immer";
import { IGlobalStateSkeletonState } from "../interfaces/IGlobalStateSkeleton";

export type GlobalStateSkeletonAction =
    | { type: 'set_title'; title: string; }
    | { type: 'set_userinfo'; userinfo: any; }
    | { type: 'get_userinfo'; userinfo: any; }
    | { type: 'api_req_init'; }
    | { type: 'api_res_success'; }
    | { type: 'api_res_error'; };


export const GlobalStateSkeletonReducer =
    (draft: Draft<IGlobalStateSkeletonState>, action: GlobalStateSkeletonAction):
        IGlobalStateSkeletonState => {
        switch (action.type) {
            case 'set_title': {
                draft.formTitle = action.title;
                return;
            }
            default:
                return;
        }
    };

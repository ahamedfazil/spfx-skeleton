import {
    IReadonlyTheme
  } from "@microsoft/sp-component-base";
import { DisplayMode } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IGlobalStateSkeletonWebPartProps, WebPartPropertyNames } from "../GlobalStateSkeletonWebPart";

export interface IGlobalStateSkeletonContext {
    webpartContext: WebPartContext;
    properties: IGlobalStateSkeletonWebPartProps;
    updateProperty: (key: WebPartPropertyNames, value: string) => void;
    displayMode: DisplayMode;
    themeVariant: IReadonlyTheme | undefined;
}

export interface IGlobalStateSkeletonState {
  formTitle: string;
  // userForm : IUserFormInfo;
}
import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IReadonlyTheme,
  ThemeChangedEventArgs,
  ThemeProvider
} from "@microsoft/sp-component-base";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'GlobalStateSkeletonWebPartStrings';
import GlobalStateSkeleton from './components/GlobalStateSkeleton';
import { IGlobalStateSkeletonProps } from './components/IGlobalStateSkeletonProps';
import { IGlobalStateSkeletonContext } from './interfaces/IGlobalStateSkeleton';
import { loadTheme } from 'office-ui-fabric-react';
import { GlobalStateSkeletonContext } from './hooks/GlobalStateSkeletonContext';

const teamsDefaultTheme = require("../../common/theme/TeamsDefaultTheme.json");
const teamsDarkTheme = require("../../common/theme/TeamsDarkTheme.json");
const teamsContrastTheme = require("../../common/theme/TeamsContrastTheme.json");

export interface IGlobalStateSkeletonWebPartProps {
  title: string;
  description: string;
}
// having property names as 'type' will make sure we give right name in updateProperty() callback
export type WebPartPropertyNames =
  | 'title'
  | 'description';

export default class GlobalStateSkeletonWebPart extends BaseClientSideWebPart<IGlobalStateSkeletonWebPartProps> {

  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  protected async onInit(): Promise<void> {
    this._themeProvider = this.context.serviceScope.consume(
      ThemeProvider.serviceKey
    );
    this._themeVariant = this._themeProvider.tryGetTheme();
    this._themeProvider.themeChangedEvent.add(
      this,
      this._handleThemeChangedEvent
    );

    if (this.context.sdks.microsoftTeams) {
      const context = this.context.sdks.microsoftTeams!.context;
      this._applyTheme(context.theme || "default");
      this.context.sdks.microsoftTeams.teamsJs.registerOnThemeChangeHandler(
        this._applyTheme
      );
    }
    return Promise.resolve();
  }


  public render(): void {
    // One main context that will hold all necessary context, properties for your webpart
    const globalStateSkeletonContextValue: IGlobalStateSkeletonContext = {
      webpartContext: this.context,
      properties: this.properties,
      updateProperty: ((key, val) => this.properties[key] = val),
      displayMode: this.displayMode,
      themeVariant: this._themeVariant,
    };

    // Put the context value with Provider
    const element: React.ReactElement = React.createElement(
      GlobalStateSkeletonContext.Provider,
      {
        value: {
          globalStateSkeletonContext: globalStateSkeletonContextValue
        }
      },
      React.createElement(GlobalStateSkeleton)
    );

    ReactDom.render(element, this.domElement);
  }


  private _handleThemeChangedEvent = (args: ThemeChangedEventArgs): void => {
    this._themeVariant = args.theme;
    this.render();
  }

  private _applyTheme = (theme: string): void => {
    this.context.domElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    if (theme == "dark") {
      loadTheme({
        palette: teamsDarkTheme,
      });
    }

    if (theme == "default") {
      loadTheme({
        palette: teamsDefaultTheme,
      });
    }

    if (theme == "contrast") {
      loadTheme({
        palette: teamsContrastTheme,
      });
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

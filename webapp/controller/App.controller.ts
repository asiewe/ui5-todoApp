import JSONModel from "sap/ui/model/json/JSONModel";
import BaseController from "./BaseController";
import SideNavigation from "sap/tnt/SideNavigation";

/**
 * @namespace todoApp.controller
 */
export default class App extends BaseController {
  /**
   * Handles the press event of the navigation bar toggle button.
   * Toggles the expanded state of the side navigation.
   *
   * @returns {void}
   */
  onNavBartoggleButtonPress() {
    const sideNavigation = this.byId("idAppSideNavigation") as SideNavigation;
    sideNavigation.setExpanded(!sideNavigation.getExpanded());
  }

  private getAppStateModel() {
    return this.getModel("AppState") as JSONModel | undefined;
  }
}

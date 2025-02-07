import JSONModel from "sap/ui/model/json/JSONModel";
import BaseController from "./BaseController";
import SideNavigation from "sap/tnt/SideNavigation";
import Dialog from "sap/m/Dialog";
import { AppState, User } from "todoApp/model";
import MessageToast from "sap/m/MessageToast";
import Event from "sap/ui/base/Event";
import Button from "sap/m/Button";
import ActionSheet from "sap/m/ActionSheet";

/**
 * @namespace todoApp.controller
 */
export default class App extends BaseController {
  loginDialog: Dialog | undefined;
  loginFormModel: JSONModel;

  onInit(): void | undefined {
    this.loginFormModel = new JSONModel({ username: null, password: null });
    this.setModel(this.loginFormModel, "login");
  }

  /**
   * Handles the press event of the navigation bar toggle button.
   * Toggles the expanded state of the side navigation.
   *
   * @returns {void}
   */
  onButtonNavBartogglePress() {
    const sideNavigation = this.byId("idAppSideNavigation") as SideNavigation;
    sideNavigation.setExpanded(!sideNavigation.getExpanded());
  }

  async onButtonShowLoginDialogPress() {
    this.loginDialog ??= (await this.loadFragment({
      name: "todoApp.view.LoginDialog",
    })) as Dialog | undefined;

    this.loginDialog?.open();
  }

  onButtonUserPress(event: Event) {
    const button = event.getSource() as Button;
    (this.byId("idUserActionSheet") as ActionSheet).openBy(button);
  }

  onLogoutButtonPress() {
    const appState: AppState = this.getAppStateModel()?.getData();
    if (appState) {
      appState.user = null;
      this.getAppStateModel()?.setData(appState);
    }
  }

  async onButtonLoginPress() {
    const appState: AppState = this.getAppStateModel()?.getData();

    try {
      const api = `${appState.backendUrl}/user/login`;
      const response = await fetch(api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...this.loginFormModel.getData(),
          expiresInMins: 30,
        }),
      });
      const user: User = await response.json();
      appState.user = user;
      this.getAppStateModel()?.setData(appState);
      this.onButtonCancelLoginPress();
    } catch (error) {
      MessageToast.show("Login failed");
    }
  }

  onButtonCancelLoginPress() {
    this.loginDialog?.close();
    this.loginFormModel.setData(
      new JSONModel({ username: null, password: null })
    );
  }

  private getAppStateModel() {
    return this.getModel("appState") as JSONModel | undefined;
  }
}

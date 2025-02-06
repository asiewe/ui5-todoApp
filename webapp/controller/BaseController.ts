import Controller from "sap/ui/core/mvc/Controller";
import AppComponent from "../Component";
import Model from "sap/ui/model/Model";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";

/**
 * @namespace todoApp.webapp.controller
 */
export default abstract class BaseController extends Controller {
  /**
   * Convenience method for accessing the component of the controller's view.
   * @returns {AppComponent} The component of the controller's view
   */
  public getOwnerComponent(): AppComponent {
    return super.getOwnerComponent() as AppComponent;
  }

  /**
   * Convenience method for getting the i18n resource bundle of the component.
   * @returns {ResourceBundle} The i18n resource bundle of the component
   */
  public getResourceBundle(): ResourceBundle {
    const oModel = this.getOwnerComponent().getModel("i18n") as ResourceModel;
    return oModel.getResourceBundle() as ResourceBundle;
  }

  /**
   * Convenience method for getting the view model by name in every controller of the application.
   * @param {string} [sName] The model name
   * @returns {Model} The model instance
   */
  public getModel(sName?: string): Model | undefined {
    return this.getView()?.getModel(sName);
  }

  /**
   * Convenience method for setting the view model in every controller of the application.
   * @param {Model} oModel The model instance
   * @param {string} [sName] The model name
   * @returns {BaseController} The current base controller instance
   */
  public setModel(oModel: Model, sName?: string): BaseController {
    this.getView()?.setModel(oModel, sName);
    return this;
  }
}

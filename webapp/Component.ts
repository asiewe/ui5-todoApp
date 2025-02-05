import UIComponent from "sap/ui/core/UIComponent";

/**
 * @namespace todoApp
 */
export default class Component extends UIComponent {
  static metadata = {
    manifest: "json",
    interfaces: ["sap.ui.core.IAsyncContentCreation"],
  };
  init() {
    // call the init function of the parent
    super.init();

    // create the views based on the url/hash
    this.getRouter().initialize();
  }
}

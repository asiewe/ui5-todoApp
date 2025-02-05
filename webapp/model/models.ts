import JSONModel from "sap/ui/model/json/JSONModel";
import Device from "sap/ui/Device";

/**
 * Provide app-view type models (as in the first "V" in MVVC)
 *
 * @returns {JSONModel} createDeviceModel() for providing runtime info for the device the UI5 app is running on
 */
export function createDeviceModel(): JSONModel {
  const oModel = new JSONModel(Device);
  oModel.setDefaultBindingMode("OneWay");
  return oModel;
}

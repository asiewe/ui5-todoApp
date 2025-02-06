import Event from "sap/ui/base/Event";
import BaseController from "./BaseController";
import Input from "sap/m/Input";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace todoApp.controller
 */
export default class Overview extends BaseController {
  onInputSubmit(event: Event) {
    const value = (event.getSource() as Input).getValue();
    if (value) {
      const todoModel = this.getModel("todos") as JSONModel;
      if (todoModel) {
        const todos = todoModel.getData();
        todos.todos.push({
          id: todos.todos.length + 1,
          todo: value,
          completed: false,
          userId: 4,
        });
        todoModel.setData(todos);
        // reset the input
        (this.byId("idtodoInput") as Input).setValue("");
      }
    }
  }
}

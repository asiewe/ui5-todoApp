import Event from "sap/ui/base/Event";
import BaseController from "./BaseController";
import Input from "sap/m/Input";
import JSONModel from "sap/ui/model/json/JSONModel";
import { Todo } from "todoApp/model";

/**
 * @namespace todoApp.controller
 */
export default class Overview extends BaseController {
  /**
   * add a new todo item to the list
   * @param event
   */
  onInputSubmit(event: Event) {
    const value = (event.getSource() as Input).getValue();
    const todoModel = this.getTodoModel();
    if (value && todoModel) {
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

  /**
   * delete a todo item from the list
   * @param {number} todoId the id of the todo item to delete
   */
  onButtonDeletePress(todoId: number) {
    const todoModel = this.getTodoModel();
    if (todoModel) {
      const todos = todoModel.getData();
      const todoIndex = todos.todos.findIndex(
        (todo: Todo) => todo.id === todoId
      );
      todos.todos.splice(todoIndex, 1);
      todoModel.setData(todos);
    }
  }

  private getTodoModel(): JSONModel | undefined {
    return this.getModel("todos") as JSONModel | undefined;
  }
}

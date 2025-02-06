import Event from "sap/ui/base/Event";
import BaseController from "./BaseController";
import Input from "sap/m/Input";
import JSONModel from "sap/ui/model/json/JSONModel";
import { Todo } from "todoApp/model";
import SearchField from "sap/m/SearchField";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import ListBinding from "sap/ui/model/ListBinding";
import SegmentedButton from "sap/m/SegmentedButton";

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

  onSearchFieldLiveChange(event: Event) {
    const searchField: SearchField = event.getSource();
    const searchValue = searchField.getValue();
    const searchFilter = [];
    if (searchValue && searchValue.length > 0) {
      searchFilter.push(
        new Filter("todo", FilterOperator.Contains, searchValue)
      );
    }
    this.applySearchFilter(searchFilter);
  }

  onSegmentedButtonSelectionChange(event: Event) {
    const segmentedButton = event.getSource() as SegmentedButton;
    const filterKey = segmentedButton.getSelectedKey();
    const filters: Filter[] = [];

    // eslint-disable-line default-case
    switch (filterKey) {
      case "active":
        filters.push(new Filter("completed", FilterOperator.EQ, false));
        break;
      case "completed":
        filters.push(new Filter("completed", FilterOperator.EQ, true));
        break;
      case "all":
      default:
      // Don't use any filter
    }
    this.applySearchFilter(filters);
  }

  onButtonClearCompletedPress() {
    const todoModel = this.getTodoModel();
    if (todoModel) {
      const todos = todoModel.getData();
      const activeTodos = todos.todos.filter((todo: Todo) => !todo.completed);
      todoModel.setData({ todos: activeTodos });
    }
  }

  private applySearchFilter(searchFilter: Filter[]) {
    const list = this.byId("idTodosList");
    if (list) {
      const binding = list.getBinding("items") as ListBinding;
      binding.filter(searchFilter);
    }
  }

  private getTodoModel(): JSONModel | undefined {
    return this.getModel("todos") as JSONModel | undefined;
  }
}

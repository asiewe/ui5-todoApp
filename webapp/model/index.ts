/**
 * Represents a Todo item.
 */
export interface Todo {
  /**
   * The unique identifier of the Todo item.
   */
  id: number;

  /**
   * Indicates whether the Todo item is completed.
   */
  completed: boolean;

  /**
   * The description or title of the Todo item.
   */
  todo: string;

  /**
   * The unique identifier of the user who created the Todo item.
   */
  userId: number;
}

/**
 * Represents the state of the application.
 */
export interface AppState {
  githubUrl: string;
}

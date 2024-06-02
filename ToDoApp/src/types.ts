export type FileterValue = "All" | "Active" | "Completed";

export interface Todo {
  id: number;
  description: string;
  completed: boolean;
}

export interface readLocalStorageProps {
  storageKey: string;
  validationFn: (todos: Todo[]) => boolean;
  successFn: (todos: Todo[]) => void;
}

export interface setLocalStorageProps {
  storageKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

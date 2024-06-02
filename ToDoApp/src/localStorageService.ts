import { readLocalStorageProps, setLocalStorageProps } from "./types";

export const readFromLocalStorage = ({
  storageKey,
  validationFn,
  successFn,
}: readLocalStorageProps) => {
  try {
    const storedTodos = localStorage.getItem(storageKey);
    if (storedTodos) {
      const storedTodosParsed = JSON.parse(storedTodos);
      const isValid = validationFn(storedTodosParsed);
      if (isValid) {
        successFn(storedTodosParsed);
      } else {
        console.error(`Stored ${storageKey} are not valid`);
        // remove from localStorage if value is not valid
        localStorage.removeItem(storageKey);
      }
    }
  } catch (error) {
    console.error("Error accessing localStorage", error);
  }
};

export const setToLocalStorage = ({
  storageKey,
  value,
}: setLocalStorageProps) => {
  try {
    localStorage.setItem(storageKey, JSON.stringify(value));
  } catch (error) {
    console.error("Error accessing localStorage", error);
  }
};

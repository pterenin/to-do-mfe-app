import { FileterValue } from "./types";

interface filterValuesType {
  ALL: FileterValue;
  ACTIVE: FileterValue;
  COMPLETED: FileterValue;
}

export const FILTER_VALUES: filterValuesType = {
  ALL: "All",
  ACTIVE: "Active",
  COMPLETED: "Completed",
};

export const FILTER_VALUE_LIST = [
  FILTER_VALUES.ALL,
  FILTER_VALUES.ACTIVE,
  FILTER_VALUES.COMPLETED,
];

export const TODOS_STORAGE_KEY = "todos";

export const MAX_DESCRIPTION_LENGTH = 100;

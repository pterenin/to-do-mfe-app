import React from "react";
import { FILTER_VALUE_LIST } from "../../constants";
import { FileterValue } from "../../types";

interface TodoFilterTabsProps {
  onFilterChange: (value: FileterValue) => void;
  activeFilter: FileterValue;
}

const TodoFilterTabs: React.FC<TodoFilterTabsProps> = ({
  onFilterChange,
  activeFilter,
}) => {
  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {FILTER_VALUE_LIST.map((value: FileterValue) => {
        const inactiveClassName =
          "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300";
        const activeClassName =
          "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500";
        return (
          <li className="me-2" key={value}>
            <a
              href="#"
              onClick={() => {
                onFilterChange(value);
              }}
              aria-current="page"
              className={
                activeFilter === value ? activeClassName : inactiveClassName
              }
            >
              {value}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoFilterTabs;

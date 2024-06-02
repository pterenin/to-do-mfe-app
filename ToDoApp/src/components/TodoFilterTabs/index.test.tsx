import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoFilterTabs from ".";
import { FILTER_VALUE_LIST } from "../../constants";
import { FileterValue } from "../../types";

describe("TodoFilterTabs", () => {
  const activeClass = "text-blue-600 bg-gray-100";
  const mockOnFilterChange = jest.fn();
  const defaultProps = {
    onFilterChange: mockOnFilterChange,
    activeFilter: FILTER_VALUE_LIST[0] as FileterValue,
  };

  beforeEach(() => {
    mockOnFilterChange.mockClear();
  });

  test("renders the filter tabs", () => {
    render(<TodoFilterTabs {...defaultProps} />);
    FILTER_VALUE_LIST.forEach((value) => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });

  test("applies the active class to the active filter", () => {
    render(
      <TodoFilterTabs {...defaultProps} activeFilter={FILTER_VALUE_LIST[1]} />
    );
    const activeTab = screen.getByText(FILTER_VALUE_LIST[1]);
    expect(activeTab).toHaveClass(activeClass);
  });

  test("applies the inactive class to inactive filters", () => {
    render(
      <TodoFilterTabs {...defaultProps} activeFilter={FILTER_VALUE_LIST[1]} />
    );
    FILTER_VALUE_LIST.forEach((value, index) => {
      const tab = screen.getByText(value);
      if (index === 1) {
        expect(tab).toHaveClass(activeClass);
      } else {
        expect(tab).not.toHaveClass(activeClass);
      }
    });
  });

  test("calls onFilterChange when a filter is clicked", () => {
    render(<TodoFilterTabs {...defaultProps} />);
    const tab = screen.getByText(FILTER_VALUE_LIST[2]);
    fireEvent.click(tab);
    expect(mockOnFilterChange).toHaveBeenCalledWith(FILTER_VALUE_LIST[2]);
  });
});

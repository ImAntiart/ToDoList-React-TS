import { useState } from "react";

type TaskControlsProps = {
  onSortChange: (sortType: "newest" | "oldest") => void;
  onFilterChange: (filterType: "all" | "completed" | "active") => void;
};

export const TaskControls = ({ onSortChange, onFilterChange }: TaskControlsProps) => {
  const [sortType, setSortType] = useState<"newest" | "oldest">("newest");
  const [filterType, setFilterType] = useState<"all" | "completed" | "active">("all");

  return (
    <div className="task-controls">
      <div className="sort-controls">
        <label htmlFor="sort-select">Сортировка:</label>
        <select
          id="sort-select"
          aria-label="Выберите тип сортировки задач"
          value={sortType}
          onChange={(e) => {
            const value = e.target.value as "newest" | "oldest";
            setSortType(value);
            onSortChange(value);
          }}
        >
          <option value="newest">Новые сначала</option>
          <option value="oldest">Старые сначала</option>
        </select>
      </div>

      <div className="filter-controls">
        <label htmlFor="filter-select">Фильтр:</label>
        <select
          id="filter-select"
          aria-label="Выберите фильтр для задач"
          value={filterType}
          onChange={(e) => {
            const value = e.target.value as "all" | "completed" | "active";
            setFilterType(value);
            onFilterChange(value);
          }}
        >
          <option value="all">Все задачи</option>
          <option value="completed">Выполненные</option>
          <option value="active">Невыполненные</option>
        </select>
      </div>
    </div>
  );
};
interface FilterButtonsProps {
  activeFilter: "all" | "pending" | "completed";
  onFilterChange: (filter: "all" | "pending" | "completed") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function FilterButtons({
  activeFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: FilterButtonsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between mb-6">
      <div className="flex items-center space-x-2 mb-4 sm:mb-0">
        <button
          onClick={() => onFilterChange("all")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm ${
            activeFilter === "all"
              ? "bg-blue-600 text-white"
              : "bg-white text-slate-600 border border-slate-300 hover:border-slate-400"
          }`}
        >
          All Tasks
        </button>
        <button
          onClick={() => onFilterChange("pending")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm ${
            activeFilter === "pending"
              ? "bg-blue-600 text-white"
              : "bg-white text-slate-600 border border-slate-300 hover:border-slate-400"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => onFilterChange("completed")}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm ${
            activeFilter === "completed"
              ? "bg-blue-600 text-white"
              : "bg-white text-slate-600 border border-slate-300 hover:border-slate-400"
          }`}
        >
          Completed
        </button>
      </div>
      
      <div className="relative">
        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-64"
        />
      </div>
    </div>
  );
}

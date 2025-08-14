interface HeaderProps {
  taskStats: {
    total: number;
    completed: number;
    pending: number;
  };
}

export default function Header({ taskStats }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <i className="fas fa-tasks text-white text-lg"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">TaskFlow</h1>
              <p className="text-sm text-slate-500">Organize your day efficiently</p>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center space-x-6 text-sm">
            <div className="text-center">
              <div className="font-semibold text-slate-800">{taskStats.total}</div>
              <div className="text-slate-500">Total</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-emerald-600">{taskStats.completed}</div>
              <div className="text-slate-500">Done</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-amber-600">{taskStats.pending}</div>
              <div className="text-slate-500">Pending</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

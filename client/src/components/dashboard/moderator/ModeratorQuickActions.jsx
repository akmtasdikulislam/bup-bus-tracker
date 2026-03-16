const ModeratorQuickActions = ({ actions }) => {
  return (
    <div className="rounded-xl border border-white/30 bg-black/30 p-6 backdrop-blur-xl">
      <h3 className="mb-6 text-lg font-semibold text-white">Quick Actions</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={`group relative rounded-xl border border-white/40 bg-gradient-to-r ${action.color} p-6 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 ${action.hoverColor} hover:shadow-2xl`}
          >
            <div className="flex items-center gap-4">
              <div className={`rounded-lg ${action.iconBg} p-3`}>
                <action.icon className={`h-6 w-6 ${action.iconColor}`} />
              </div>
              <div className="flex-1 text-left">
                <h4 className="text-base font-semibold text-white drop-shadow-lg">
                  {action.title}
                </h4>
                <p className="text-sm text-gray-300 drop-shadow">
                  {action.description}
                </p>
              </div>
            </div>
            
            {/* Hover effect overlay */}
            <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ModeratorQuickActions;

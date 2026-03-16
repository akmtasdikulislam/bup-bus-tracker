import { GLASS_PRESETS } from "../../../utils/glassomorphism";

const QuickActions = ({ actions }) => {
  return (
    <div className={`rounded-xl p-6 ${GLASS_PRESETS.DASHBOARD_CARD}`}>
      <h3 className="mb-6 text-lg font-semibold text-white">Quick Actions</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={`group relative rounded-xl bg-gradient-to-r ${action.color} p-6 text-white ${action.hoverColor} ${GLASS_PRESETS.DASHBOARD_CARD}`}
          >
            <div className="flex items-start gap-4">
              <div className={`rounded-lg ${action.iconBg} p-3`}>
                <action.icon className={`h-6 w-6 ${action.iconColor}`} />
              </div>
              <div className="flex-1 text-left">
                <h4 className="text-lg font-semibold">{action.title}</h4>
                <p className="text-sm text-gray-300">{action.description}</p>
              </div>
            </div>
            <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;

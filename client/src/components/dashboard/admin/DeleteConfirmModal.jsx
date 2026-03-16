import { PiWarningDuotone, PiXBold } from "react-icons/pi";
import { Z_CLASSES } from "../../../utils/zIndexLayers";

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  itemType,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 ${Z_CLASSES.MODAL} flex items-center justify-center bg-black/50 backdrop-blur-sm`}
    >
      <div className="relative w-full max-w-md rounded-xl border border-white/30 bg-black/80 backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/20 p-6">
          <h2 className="text-xl font-bold text-white">Confirm Delete</h2>
          <button
            onClick={onClose}
            className="rounded-lg border border-white/40 bg-white/25 p-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/35"
          >
            <PiXBold className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="rounded-full bg-red-500/20 p-3">
                <PiWarningDuotone className="h-6 w-6 text-red-400" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white">
                Delete {itemType}?
              </h3>
              <p className="mt-1 text-sm text-gray-300">
                Are you sure you want to delete <strong>{itemName}</strong>?
                This action cannot be undone.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-lg border border-white/40 bg-white/25 px-4 py-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/35"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="rounded-lg border border-red-400/40 bg-red-500/25 px-4 py-2 text-white backdrop-blur-md transition-all duration-300 hover:bg-red-500/35"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;

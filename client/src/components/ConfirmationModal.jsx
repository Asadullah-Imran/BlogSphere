// src/components/ConfirmationModal.js
import React from "react";

const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-cusDarkBG p-6 rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-cusPrimaryColor dark:text-cusSecondaryLightColor">
          Confirm Deletion
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Are you sure you want to delete this comment? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

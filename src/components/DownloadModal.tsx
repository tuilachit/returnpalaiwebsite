import React from 'react';
import { Modal } from './ui/Modal';
import { EarlyUserForm } from './EarlyUserForm';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const handleSuccess = () => {
    // Keep modal open to show success message
    // Modal will auto-close after success animation
    setTimeout(() => {
      onClose();
    }, 4000);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="" className="bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Join Early Access</h2>
          <p className="text-white/90 text-sm">
            Be among the first to experience ReturnPal AI when we launch. Help us build something amazing together.
          </p>
        </div>
        
        <EarlyUserForm onSuccess={handleSuccess} />
      </div>
    </Modal>
  );
};
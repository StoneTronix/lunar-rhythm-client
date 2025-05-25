import React, { FC, ReactNode } from 'react';
import './ModalBase.scss';

interface BaseModalProps {
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const ModalBase: FC<BaseModalProps> = ({ onClose, children, title }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h3>{title}</h3>}
        {children}
      </div>
    </div>
  );
};

export default ModalBase;

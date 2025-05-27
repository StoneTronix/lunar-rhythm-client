import { FC } from 'react';
import ModalBase from '@components/ModalBase/ModalBase';
import './PlaylistDeleteModal.scss';

interface PlaylistDeleteModalProps {
  playlistTitle: string;
  onClose: () => void;
  onConfirm: () => void;
}

const PlaylistDeleteModal: FC<PlaylistDeleteModalProps> = ({ 
  playlistTitle,
  onClose, 
  onConfirm 
}) => {
  return (
    <ModalBase title="Удаление плейлиста" onClose={onClose}>
      <div className="delete-confirmation">
        <p>Удалить плейлист <strong>"{playlistTitle}"</strong>?</p>
        <p className="warning-message">Это действие нельзя отменить.</p>
        
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button">
            Отмена
          </button>
          <button 
            area-label="удалить"
            className="danger-button"
            onClick={onConfirm} 
          >
            Удалить
          </button>
        </div>
      </div>
    </ModalBase>
  );
};

export default PlaylistDeleteModal;
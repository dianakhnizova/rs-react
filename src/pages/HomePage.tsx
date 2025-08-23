import { Button } from '@/components/button/Button';
import styles from './HomePage.module.scss';
import { messages } from './messages';
import { UncontrolledForm } from '@/components/uncontrolled-form/UncontrolledForm';
import { useState } from 'react';
import { Modal } from '@/components/modal/Modal';
import { ControlledForm } from '@/components/controlled-form/ControlledForm';
import { UserList } from '@/components/user-list/UserList';

export const HomePage = () => {
  const [isUncontrolledModalOpen, setIsUncontrolledModalOpen] = useState(false);
  const [isControlledModalOpen, setIsControlledModalOpen] = useState(false);
  const [showUserData, setShowUserData] = useState(false);

  const handleUncontrolledOpenModal = () => {
    setIsUncontrolledModalOpen(true);
  };

  const handleUncontrolledCloseModal = () => {
    setIsUncontrolledModalOpen(false);
  };

  const handleControlledOpenModal = () => {
    setIsControlledModalOpen(true);
  };

  const handleControlledCloseModal = () => {
    setIsControlledModalOpen(false);
  };

  const handleFormSuccess = () => {
    setIsUncontrolledModalOpen(false);
    setShowUserData(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{messages.appTitle}</h1>

      <div className={styles.buttonContainer}>
        <Button onClick={handleUncontrolledOpenModal}>
          {messages.uncontrolledButton}
        </Button>

        <Button onClick={handleControlledOpenModal}>
          {messages.reactHookFormButton}
        </Button>
      </div>

      <Modal
        isOpen={isUncontrolledModalOpen}
        onClose={handleUncontrolledCloseModal}
      >
        <UncontrolledForm onSuccess={handleFormSuccess} />
      </Modal>

      {showUserData && <UserList onClose={() => setShowUserData(false)} />}

      <Modal
        isOpen={isControlledModalOpen}
        onClose={handleControlledCloseModal}
      >
        <ControlledForm />
      </Modal>
    </div>
  );
};

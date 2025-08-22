import { Button } from '@/components/button/Button';
import styles from './HomePage.module.scss';
import { messages } from './messages';
import { UncontrolledForm } from '@/components/uncontrolled-form/UncontrolledForm';
import { useState } from 'react';
import { Modal } from '@/components/modal/Modal';

export const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUncontrolledButton = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{messages.appTitle}</h1>

      <div className={styles.buttonContainer}>
        <Button onClick={handleUncontrolledButton}>
          {messages.uncontrolledButton}
        </Button>
        <Button>{messages.reactHookFormButton}</Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <UncontrolledForm />
      </Modal>
    </div>
  );
};

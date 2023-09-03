import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button } from "utils/Button";

Modal.setAppElement('#root'); // Set the root element for accessibility

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Logging in with username:', username);
    console.log('Password:', password);
    // Close the modal
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Login Modal"
      className="modal fixed inset-0 mx-auto mt-20 p-8 rounded-lg bg-white shadow-lg max-w-md w-full h-fit"
      overlayClassName="overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="modal-content">
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg border focus:outline-none focus:border-primary-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg border focus:outline-none focus:border-primary-500"
          />
        <Button
          onClick={handleLogin}
          classProps='w-full'
          // className="w-full py-2 text-white bg-primary-500 hover:bg-primary-600 rounded-lg focus:outline-none"
        >
          Login
        </Button>
        <Button
          onClick={onClose}
          classProps='w-full btn-secondary mt-2'
          // className="w-full py-2 mt-2 text-gray-600 hover:text-gray-800 rounded-lg focus:outline-none"
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default LoginModal;

import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button } from "utils/Button";
import { FaTimes } from "react-icons/fa";

Modal.setAppElement('#root'); // Set the root element for accessibility

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // State to track registration mode

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Logging in with username:', username);
    console.log('Password:', password);
    // Close the modal
    onClose();
  };

  const handleRegisterClick = () => {
    // Switch to registration mode
    setIsRegistering(true);
  };

  const handleBackToLoginClick = () => {
    // Switch back to login mode
    setIsRegistering(false);
  };

  const handleRegisterNow = () => {
    // Switch back to login mode
    console.log('Registering with username:', username);
    console.log('Registering with email:', email);
    onClose();
  };

  const renderLoginForm = () => {
    return (
      <>
        <div className='mb-8 flex'>
          <h2 className='text-2xl font-bold w-1/2'>Login</h2>
          <div
            className='flex w-1/2 mt-2 justify-end'
          >
            <div
              onClick={onClose} ><FaTimes /></div>
          </div>
        </div>
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
        >
          Login
        </Button>
        <p className="mt-2 text-center">
          <span className="text-primary-500 cursor-pointer" onClick={handleRegisterClick}>
            Register Now
          </span>
        </p>
      </>
    );
  };

  const renderRegistrationForm = () => {
    return (
      <>
        <div className='mb-8 flex'>
          <h2 className='text-2xl font-bold w-1/2'>Register Now</h2>
          <div
            className='flex w-1/2 mt-2 justify-end'
          >
            <div
              onClick={onClose} ><FaTimes /></div>
          </div>
        </div>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg border focus:outline-none focus:border-primary-500"
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg border focus:outline-none focus:border-primary-500"
        />
        <Button
          onClick={handleRegisterNow}
          classProps='w-full'
        >
          Register
        </Button>
        <Button
          onClick={handleBackToLoginClick}
          classProps='w-full btn-secondary mt-2'
        >
          Back to Login
        </Button>
      </>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Login Modal"
      className="modal fixed inset-0 mx-auto md:mt-20 p-8 pt-24 md:pt-8 md:rounded-lg bg-white shadow-lg max-w-md w-full h-screen md:h-fit"
      overlayClassName="overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="modal-content">
        {isRegistering ? renderRegistrationForm() : renderLoginForm()}
      </div>
    </Modal>
  );
};

export default LoginModal;

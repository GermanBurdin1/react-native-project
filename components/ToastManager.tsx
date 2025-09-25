import React, { useState, useImperativeHandle, forwardRef } from 'react';
import Toast, { ToastType } from './Toast';

export interface ToastManagerRef {
  show: (message: string, type?: ToastType, duration?: number) => void;
  hide: () => void;
}

const ToastManager = forwardRef<ToastManagerRef>((_, ref) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('info');
  const [duration, setDuration] = useState(4000);

  useImperativeHandle(ref, () => ({
    show: (msg: string, toastType: ToastType = 'info', toastDuration: number = 4000) => {
      setMessage(msg);
      setType(toastType);
      setDuration(toastDuration);
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
    },
  }));

  const handleHide = () => {
    setVisible(false);
  };

  return (
    <Toast
      visible={visible}
      message={message}
      type={type}
      duration={duration}
      onHide={handleHide}
    />
  );
});

ToastManager.displayName = 'ToastManager';

export default ToastManager;
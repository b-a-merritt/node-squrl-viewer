'use client';

import React from 'react';
import styles from './toast.module.css';

export interface ToastProps {
  message: string;
  onClose?: () => void;
  type: 'error' | 'info' | 'success' | 'warning';
}

export const Toast = ({
  message,
  type,
  onClose,
}: ToastProps) => {
  const [toastIsClosed, setToastIsClosed] = React.useState(false);

  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    timer.current = setTimeout(() => {
      setToastIsClosed(true);
      !!onClose && onClose();
    }, 10 * 1000);

    return () => {
      clearTimeout(timer.current as ReturnType<typeof setTimeout>);
    };
  }, [onClose]);

  return (
    <div className={styles["container"]}>
      <div className={`${toastIsClosed ? 'toast-closed' : ''}`}>
        <output
          className={styles["output"]}
          style={{
            backgroundColor: type === 'error'
            ? 'var(--color-red)'
            : type === 'info'
            ? '#194a75'
            : type === 'success'
            ? 'var(--color-green)'
            : 'var(--color-yellow)'
          }}
        >
          <p className={styles["text"]}>{message}</p>
        </output>
      </div>
    </div>
  );
};

import React from 'react';
import ToastShelf from '../ToastShelf'
import useEscapeKey from '../../hooks/useEscapeKey';

export const TOAST_VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

export const ToastContext = React.createContext()

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([])

  const dismissToast = id => setToasts(toasts.filter(t => t.id !== id))

  const showToast = (variant, message) => {
    if (!TOAST_VARIANT_OPTIONS.includes(variant)) {
      throw new Error(`Expected variant to be one of ${TOAST_VARIANT_OPTIONS}`)
    }

    setToasts([...toasts, {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      variant,
      message
    }])
  }

  useEscapeKey(React.useCallback(() => setToasts([]), []))

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      <ToastShelf />
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;

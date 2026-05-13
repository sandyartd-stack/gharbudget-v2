// This module replaces the old Toast component.
// Import toast from here and call toast.success(), toast.error() etc.
import hotToast, { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 2000,
        style: {
          background: '#1B1425',
          color: '#fff',
          fontSize: '13px',
          fontWeight: 500,
          fontFamily: "'DM Sans', system-ui, sans-serif",
          borderRadius: '24px',
          padding: '10px 20px',
          boxShadow: '0 8px 32px rgba(27, 20, 37, 0.3)',
        },
        success: {
          iconTheme: { primary: '#2D7A5F', secondary: '#fff' },
        },
        error: {
          iconTheme: { primary: '#C9423F', secondary: '#fff' },
          duration: 3000,
        },
      }}
    />
  );
}

export const toast = {
  success: (msg) => hotToast.success(msg),
  error: (msg) => hotToast.error(msg),
  info: (msg) => hotToast(msg),
  loading: (msg) => hotToast.loading(msg),
};

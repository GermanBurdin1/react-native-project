let toastRef = null;

export const setToastRef = (ref) => {
  toastRef = ref;
};

export const showToast = (message, type = 'info', duration = 4000) => {
  if (toastRef && toastRef.current) {
    toastRef.current.show(message, type, duration);
  }
};

export const showSuccess = (message, duration = 4000) => {
  showToast(message, 'success', duration);
};

export const showError = (message, duration = 5000) => {
  showToast(message, 'error', duration);
};

export const showWarning = (message, duration = 4000) => {
  showToast(message, 'warning', duration);
};

export const showInfo = (message, duration = 4000) => {
  showToast(message, 'info', duration);
};

export const hideToast = () => {
  if (toastRef && toastRef.current) {
    toastRef.current.hide();
  }
};
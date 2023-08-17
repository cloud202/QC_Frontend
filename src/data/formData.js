// FormDataManager.js
export const saveFormData = (formData) => {
    localStorage.setItem('formData', JSON.stringify(formData));
  };
  
  export const loadFormData = () => {
    const storedData = localStorage.getItem('formData');
    return storedData ? JSON.parse(storedData) : null;
  };
  
  export const clearFormData = () => {
    localStorage.removeItem('formData');
  };
  
// utils.js

export const convertImageToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        resolve(reader.result.split(',')[1]); // Extracting only the base64 data
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsDataURL(file);
    });
  };
  
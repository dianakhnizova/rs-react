export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') resolve(reader.result);
      else reject(new Error('FileReader result is not a string'));
    };

    reader.onerror = () =>
      reject(new Error(reader.error?.message || 'Error reading file'));

    reader.readAsDataURL(file);
  });
};

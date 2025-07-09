export const timeoutForSpinner = async () => {
  await new Promise(res => setTimeout(res, 2000));
};

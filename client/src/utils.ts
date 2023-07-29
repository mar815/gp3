export const debounce = (func: (...args: any[]) => any, delay: number) => {
  let timerId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

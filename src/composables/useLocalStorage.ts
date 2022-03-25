const useLocalStorage = () => {
  return { hasItem, setItem, getItem, removeItem };
};

const hasItem = (key: string) => {
  return localStorage.getItem(key) !== null;
};

const setItem = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key: string) => {
  const value = localStorage.getItem(key) || "";
  try {
    const parsedValue = JSON.parse(value);
    return parsedValue;
  } catch (error) {
    return value;
  }
};

const removeItem = (key: string) => {
  if (hasItem(key)) {
    localStorage.removeItem(key);
  }
};

export default useLocalStorage;

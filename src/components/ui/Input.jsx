function Input({ placeholder, value, onChange }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border p-2 rounded-lg w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  );
}

export default Input;
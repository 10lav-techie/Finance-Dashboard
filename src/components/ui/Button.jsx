function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        bg-indigo-600 
        text-white 
        px-4 py-2 
        rounded-xl 
        font-medium
        hover:bg-indigo-700 
        active:scale-95 
        transition-all duration-200 
        shadow-sm hover:shadow-md
      "
    >
      {children}
    </button>
  );
}

export default Button;
function Card({ children }) {
  return (
    <div className="
      bg-white dark:bg-gray-800 
      text-gray-800 dark:text-gray-200 
      rounded-2xl 
      shadow-sm 
      hover:shadow-lg 
      transition-all duration-300 
      p-5
    ">
      {children}
    </div>
  );
}

export default Card;
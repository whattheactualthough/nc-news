import { useState } from "react";


const SortArticlesDropdown = ({ sortBy, setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSortClick = (value) => {
    setSortBy(value);
    setIsOpen(false);
  };

  const options = [
    { label: "date", value: "created_at" },
    { label: "votes", value: "votes" },
    { label: "comments", value: "comment_count" },
  ];

//   const selectedOption = options.find((o) => o.value === sortBy);
//   const currentLabel = selectedOption && sortBy ? selectedOption.label : 'Sort articles';


  return (
    <div className="relative w-64 ml-4">
      <div
        className="sticky top-0 bg-white z-20 border-b border-gray-200 px-3 py-2 flex justify-between items-center cursor-pointer rounded-t-lg shadow"
        onClick={handleToggle}
      >
        <span className="font-medium text-gray-600">Sort articles</span>
        <span className="text-gray-600 ml-1">{isOpen ? "▲" : "▼"}</span>
      </div>

      <div
        className={
          "absolute top-full left-0 w-full bg-white shadow-md " +
          "overflow-hidden transition-all duration-300 ease-in-out rounded-b-lg " +
          (isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 invisible")
        }
      >
        <ul>
          {options.map(({ label, value }) => (
            <li
              key={value}
              onClick={() => handleSortClick(value)}
              className="text-gray-600 flex items-center gap-2 px-3 py-1 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SortArticlesDropdown;


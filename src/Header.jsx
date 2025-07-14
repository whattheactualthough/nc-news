import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "./contexts/User";
import TopicsNavbar from "./TopicsNavbar";
import SortArticles from "./SortArticles";

const Header = ({ sortBy, setSortBy, order, setOrder }) => {
  const { user, logIn, logOut } = useUser();

  // conditional if props.selectedTopic filter articles by topic const result = response.data.filter(item => item.class === 'something')
  return (
    <header className="bg-white shadow px-4 py-3">
      <div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <Link
            to="/"
            className="inline-block px-4 py-2 text-6xl font-bold text-gray-800 hover:text-green-300 rounded-md transition flex-shrink-0"
          >
            NC News
          </Link>
          <span className="text-gray-600 truncate">Welcome {user.isLoggedIn ? user.username : "guest"}</span>
        </div>
      </div>
      <div className="flex items-center gap-4 flex-shrink-0">
        {user.isLoggedIn ? (
          <div className="absolute top-0 right-0">
            <img
              src={user.avatarUrl}
              alt="User Avatar"
              className="rounded-full focus:outline-gray-300 focus-ring focus:border-gray-300 h-16 w-16 object-contain"
            />
            <span>{user.username}</span>
            <div>
              <button onClick={logOut} className="text-sm text-gray-600 transition-transform duration-200 
            hover:scale-125">Logout</button>
            </div>
          </div>
        ) : (
          <div className="absolute top-0 right-0">
            <button onClick={logIn} className="text-sm text-gray-600 transition-transform duration-200 
            hover:scale-125">Login</button>
          </div>
        )}
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4">
          <TopicsNavbar />
          <SortArticles
            sortBy={sortBy}
            setSortBy={setSortBy}
            order={order}
            setOrder={setOrder}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

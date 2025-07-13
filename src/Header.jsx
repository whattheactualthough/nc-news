import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "./contexts/User";
import TopicsNavbar from "./TopicsNavbar";
import SortArticles from "./SortArticles";

const Header = ({ sortBy, setSortBy, order, setOrder }) => {
  const { user, logIn, logOut } = useUser();

  // conditional if props.selectedTopic filter articles by topic const result = response.data.filter(item => item.class === 'something')
  return (
    <header key={user.username}>
      <div>
        <p>Welcome {user.isLoggedIn ? user.username : "guest"}</p>
      </div>
      <div className="user-info">
        {user.isLoggedIn ? (
          <>
            <img src={user.avatarUrl} alt="User Avatar" className="avatar" />
            <span>{user.username}</span>
            <button onClick={logOut}>Logout</button>
          </>
        ) : (
          <button onClick={logIn}>Login</button>
        )}
        <SortArticles
          sortBy={sortBy}
          setSortBy={setSortBy}
          order={order}
          setOrder={setOrder}
        />
        <TopicsNavbar />
      </div>
    </header>
  );
};

export default Header;

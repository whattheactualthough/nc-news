import {useContext, useState} from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./contexts/User";
import UserCard from "./UserCard";
import { useUser } from "./contexts/User";

const Header = () => {
  const { user, logIn, logOut } = useUser();

return (
    <header key = {user.username}>
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
        <div>
        <p>Welcome {user.isLoggedIn ? user.username : "guest"}</p>
      </div>
      </div>
    </header>
  );
}

export default Header
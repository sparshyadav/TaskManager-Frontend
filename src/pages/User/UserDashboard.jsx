import React, { useContext } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import { UserContext } from '../../context/userContext';

function UserDashboard() {
  useUserAuth();

  const {user}=useContext(UserContext);
  return (
    <div>
      {JSON.stringify(user)};
    </div>
  )
}

export default UserDashboard;

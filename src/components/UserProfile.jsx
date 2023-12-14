import React from 'react';
import { MdOutlineCancel } from "react-icons/md";
import { userProfileData } from "../data/dummy";
import Button from "./Button";
import { useStateContext } from "../contexts/ContextProvider";
import avatar from "../data/avatar.jpg";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { currentColor, dispatch } = useStateContext();
  const navigate=useNavigate();
  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    navigate('/') 
  }

  return (
    <div className="nav-item absolute right-5 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-80">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src={avatar}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">
            {" "}
            Michael Roberts{" "}
          </p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {" "}
            Administrator{" "}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">
            {" "}
            info@shop.com{" "}
          </p>
        </div>
      </div>
      <div>
      </div>
      <div className="mt-5">
        
        <button
          onClick={handleLogOut}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default UserProfile;

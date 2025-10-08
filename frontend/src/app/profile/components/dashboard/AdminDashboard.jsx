import Header from "@/components/Header/Header";
import {
  CirclePlus,
  ClipboardList,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import React, { useState } from "react";
import AdminRestaurents from "./AdminRestaurents";
import { useAuth } from "@/context/authContext";
import ProfilePage from "../ProfilePage";
import AddRestaurant from "../AddRestaurant";

const AdminDashboard = () => {
  const [content, setContent] = useState("allRestaurant");
  const [isExpanded, setIsExpanded] = useState(false);
  const [open,setOpen] = useState(false);
  const { user, logoutUser } = useAuth();
  const renderContent = () => {
    switch (content) {
      case "allRestaurant":
        return <AdminRestaurents />;
      case "addRestaurant":
        return <AddRestaurant isInline={true} />;
      case "profile":
        return <div>
          <ProfilePage user={user} logoutUser={logoutUser} isLogout={true} />
        </div>;
      case "logout":
        return <div>Logging out...</div>;
      default:
        return content;
    }
  };

  const menuItems = [
    { id: "allRestaurant", icon: ClipboardList, label: "All Restaurants" },
    { id: "addRestaurant", icon: CirclePlus, label: "Add Restaurant" },
  ];

  return (
    <div>
      <Header />
      <div className="max-w-screen-2xl flex h-[85vh] mt-5 rounded-2xl border-2 border-purple-800 mx-auto">
        <div
          className={`bg-white relative flex flex-col justify-between rounded-s-2xl transition-all duration-300 ${
            isExpanded ? "w-80" : "w-14"
          }`}
        >
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute right-2 top-2 p-2 rounded-lg bg-purple-400 hover:bg-purple-600"
          >
            {isExpanded ? (
              <ChevronLeft className="text-yellow-300" />
            ) : (
              <ChevronRight className="text-yellow-300" />
            )}
          </button>

          <div className="mt-14">
            {menuItems.map((item) => (
              <div className="flex items-center" key={item.id}>
                <button
                  onClick={() => setContent(item.id)}
                  className={`m-2 p-2 flex w-full rounded-lg transition-colors gap-2 hover:bg-purple-600 ${
                    content === item.id ? "bg-purple-600" : "bg-purple-400"
                  }`}
                >
                  <item.icon className="text-yellow-300" />
                  {isExpanded && (
                    <span
                      className={`font-bold text-lg ${
                        content === item.id
                          ? "text-yellow-300"
                          : "text-purple-800 "
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                </button>
              </div>
            ))}
          </div>
          <div className="">
            <div className="flex items-center">
              <button
                onClick={() => setContent("profile")}
                className={`m-2 p-2 w-full flex mb-4 rounded-lg transition-colors gap-2 bg-purple-400 hover:bg-purple-600 ${content === "profile" ? "bg-purple-600" : "bg-purple-400"}`}
              >
                <User className="text-yellow-300" />
                {isExpanded && (
                  <span className="text-yellow-200 font-bold">Profile</span>
                )}
              </button>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setContent("logout")}
                className={`m-2 p-2 w-full flex mb-4 rounded-lg transition-colors gap-2 bg-red-600`}
              >
                <LogOut className="text-yellow-300" />
                {isExpanded && (
                  <span className="text-yellow-200 font-bold">Logout</span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-blue-300 w-full rounded-e-2xl overflow-y-scroll p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import Header from "@/components/Header/Header";
import {
  CirclePlus,
  ClipboardList,
  Hamburger,
  LogOut,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { useState } from "react";
import AdminRestaurents from "./AdminRestaurents";

const AdminDashboard = () => {
  const [content, setContent] = useState("allRestaurant");
  const [isExpanded, setIsExpanded] = useState(false);

  const renderContent = () => {
    switch (content) {
      case "allRestaurant":
        return <AdminRestaurents />;
      case "allReview":
        return <div>All Reviews</div>;
      case "famousRestaurant":
        return <div>Famous Restaurants</div>;
      case "addRestaurant":
        return <div>Add Restaurant</div>;
      case "logout":
        return <div>Logging out...</div>;
      default:
        return content;
    }
  };

  const menuItems = [
    { id: "allRestaurant", icon: ClipboardList, label: "All Restaurants" },
    { id: "allReview", icon: Star, label: "Reviews" },
    { id: "famousRestaurant", icon: Hamburger, label: "Famous Restaurants" },
    { id: "addRestaurant", icon: CirclePlus, label: "Add Restaurant" },
  ];

  return (
    <div>
      <Header />
      <div className="max-w-screen-2xl flex h-[85vh] mt-5 rounded-2xl border-2 border-purple-800 mx-auto">
        <div
          className={`bg-white relative flex flex-col justify-between rounded-s-2xl transition-all duration-300 ${
            isExpanded ? "w-72" : "w-14"
          }`}
        >
          <div>
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
                <div className="flex items-center">
                  <button
                    key={item.id}
                    onClick={() => setContent(item.id)}
                    className={`m-2 p-2 rounded-lg transition-colors gap-2 ${
                      content === item.id ? "bg-purple-600" : "bg-purple-400"
                    }`}
                  >
                    <item.icon className="text-yellow-300" />
                  </button>
                  {isExpanded && (
                    <span className="text-purple-800 font-bold text-lg">
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setContent("logout")}
              className={`m-2 p-2 mb-4 rounded-lg transition-colors gap-2 bg-red-600`}
            >
              <LogOut className="text-yellow-300" />
            </button>
            {isExpanded && <span className="text-red-500 font-bold">Logout</span>}
          </div>
        </div>

        <div className="bg-blue-300 w-full rounded-e-2xl p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

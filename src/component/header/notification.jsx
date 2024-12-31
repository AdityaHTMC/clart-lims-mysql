/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { useDashboardContext } from "../../helper/DashboardProvider";
import { UncontrolledTooltip } from "reactstrap";
import { Link } from "react-router-dom";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";

const containerStyle = {
  position: "relative",
  display: "inline-block",
  cursor: "pointer",
};

const iconStyle = {
  position: "relative",
  fontSize: "24px",
  color: "#555",
};

const badgeStyle = {
  position: "absolute",
  top: "-8px",
  right: "-10px",
  backgroundColor: "#ff4757",
  color: "#fff",
  borderRadius: "70%",
  padding: "2px 7px",
  fontSize: "11px",
  fontWeight: "bold",
};

const dropdownStyle = {
  position: "absolute",
  top: "100%",
  left: "-100%",
  transform: "translateX(-50%)",
  marginTop: "10px",
  width: "400px",
  backgroundColor: "#fff",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  borderRadius: "12px",
  zIndex: 10,
  overflow: "hidden",
  border: "1px solid #ddd",
  textAlign: "left",
};

const headerStyle = {
  display: "flex", 
  alignItems: "center", 
  gap: "8px", 
  padding: "8px 12px",
  backgroundColor: "#f7f7f7",
  borderBottom: "1px solid #ddd",
  fontSize: "16px",
  fontWeight: "bold",
  color: "#333",
};

const notificationItemStyle = {
  padding: "8px 12px",
  borderBottom: "1px solid #eee",
  fontSize: "14px",
  color: "#444",
  backgroundColor: "#fff",
  transition: "background-color 0.3s ease",
};

const emptyMessageStyle = {
  padding: "20px",
  textAlign: "left",
  color: "#777",
  fontSize: "14px",
};

const showAllStyle = {
  textAlign: "center",
  padding: "10px",
  borderTop: "1px solid #ccc",
  backgroundColor: "#f9f9f9",
};

const linkStyle = {
  textDecoration: "none",
  color: "#000",
  fontWeight: "bold",
  cursor: "pointer",
};

const Notification = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef(null);

  const { getNotificationList, notificationList } = useDashboardContext();

  useEffect(() => {
    getNotificationList();
  }, []);

  console.log(notificationList, "notificationList");

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={containerStyle} ref={containerRef}>
      <div style={iconStyle} onClick={handleToggleDropdown}>
        🔔
        {notificationList?.total > 0 && (
          <span style={badgeStyle}>{notificationList.total}</span>
        )}
      </div>
      {isDropdownOpen && (
     <div style={dropdownStyle}>
     <div style={headerStyle}> <span style={{marginTop:'-5px'}}><MdOutlineNotificationsActive /></span> Notifications</div>
     {notificationList?.total > 0 ? (
       <>
         {notificationList?.data?.slice(0, 4).map((notification, index) => (
           <div
             key={index}
             id={`notification-${index}`} // Add an ID to match the tooltip target
             style={notificationItemStyle}
           >
             <div>
               <strong>Message:</strong>{" "}
               {notification?.message
                 ? notification?.message?.length > 40
                   ? `${notification?.message?.slice(0, 40)}...`
                   : notification?.message
                 : "NA"}
               {notification?.message && (
                 <UncontrolledTooltip
                   placement="top"
                   target={`notification-${index}`} // Tooltip target matches the ID
                 >
                   {notification?.message}
                 </UncontrolledTooltip>
               )}
             </div>
             <div>
               <strong>Order ID:</strong> {notification.orderId}
             </div>
             <div>
               <strong>Organization:</strong> {notification.organization_name}
             </div>
           </div>
         ))}

         {
          notificationList.total > 2 && (
            <div style={showAllStyle}>
           <Link to="/all-notifications-list" style={linkStyle}>
           Show All Notifications   <span> <FiExternalLink /> </span> 
           </Link>
         </div>
          )
         }
       </>
     ) : (
       <div style={emptyMessageStyle}>No notifications </div>
     )}
   </div>
     
      )}
    </div>
  );
};

export default Notification;

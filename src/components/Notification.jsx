import React from "react";

const Notification = ({ notification }) => (
  <div className={`toast ${notification.position || "toast-end"}`}>
    <div
      className={`alert ${
        notification.type === "error" ? "alert-error" : "alert-success"
      }`}
    >
      {notification.message}
    </div>
  </div>
);

export default Notification;

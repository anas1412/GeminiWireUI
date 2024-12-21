import React from "react";

const Notification = ({ notification }) => (
  <div
    className={`mb-4 p-4 rounded ${
      notification.type === "error"
        ? "bg-red-900 text-red-100"
        : "bg-green-900 text-green-100"
    }`}
  >
    {notification.message}
  </div>
);

export default Notification;

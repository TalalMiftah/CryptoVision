import React from "react";

function NotFondPage() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        background: "black",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "absolute",
        top: 0,
        gap: "2%"
      }}
    >
      <h1 style={{ color: "#ffffff", fontSize: "10rem" }}>404</h1>
      <span style={{fontSize:"1.5rem"}} >Not Found</span>
    </div>
  );
}

export default NotFondPage;

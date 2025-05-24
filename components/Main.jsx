import React from "react";

function Main(props) {
  const { children } = props;
  return <main className="flex-1 flex flex-col">{children}</main>;
}

export default Main;

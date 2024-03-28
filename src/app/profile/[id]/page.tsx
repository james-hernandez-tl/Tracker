import React from "react";

export default function UserProfile({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>UserProfile</h1>
      <div>{params.id}</div>
    </div>
  );
}

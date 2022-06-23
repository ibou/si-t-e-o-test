
import React from "react";

export default function Materiel(props) {

  const { materiel } = props;

  return (
    <div className="item">
      <div>{materiel.name}</div>
      <div>{materiel.weight}</div>
    </div>
  )
}
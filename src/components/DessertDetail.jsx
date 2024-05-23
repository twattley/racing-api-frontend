import React from "react";
import { useParams } from "react-router-dom";

export function DessertDetail() {
  const { name } = useParams();

  return (
    <div className="container my-5">
      <h1 className="text-center">Dessert Detail</h1>
      <p className="text-center">You selected: {name}</p>
    </div>
  );
}


import React from "react";
import { useParams } from "react-router-dom";

export function FoodTypeDetail() {
  const { id } = useParams();

  // You can now use the id to fetch the food type details from an API

  return (
    <div className="container my-5">
      <h1 className="text-center">Food Type Detail</h1>
      <p className="text-center">You selected food type with ID: {id}</p>
    </div>
  );
}



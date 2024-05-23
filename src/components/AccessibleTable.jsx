import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";

function createData(
  name,
  id,
  food_type,
  food_type_id,
  calories,
  fat,
  carbs,
  protein,
  description
) {
  return {
    name,
    id,
    food_type,
    food_type_id,
    calories,
    fat,
    carbs,
    protein,
    description,
  };
}

const rows = [
  createData(
    "Frozen yoghurt",
    1,
    "Dessert",
    1,
    159,
    6.0,
    24,
    4.0,
    "A delicious frozen yoghurt"
  ),
  createData(
    "Ice cream sandwich",
    2,
    "Dessert",
    1,
    237,
    9.0,
    37,
    4.3,
    "A delicious ice cream sandwich"
  ),
  createData(
    "Eclair",
    3,
    "Dessert",
    1,
    262,
    16.0,
    24,
    6.0,
    "A delicious eclair"
  ),
];

export function AccessibleTable() {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Accessible Table</h1>
      <Box className="d-flex justify-content-center">
        <TableContainer component={Paper} className="w-100">
          <Table aria-label="caption table">
            <caption>A basic table example with a caption</caption>
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell>Type</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Link
                        to={`/dessert/${row.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {row.name}
                      </Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link
                        to={`/food_type/${row.food_type_id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {row.food_type}
                      </Link>
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={6} style={{ paddingLeft: "16px" }}>
                      {row.description}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

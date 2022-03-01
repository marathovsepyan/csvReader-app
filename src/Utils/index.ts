import React from "react";
import { TypesOfSpec } from "./mainInterfaces";

export const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: "volume (m3 per hectare)",
        },
      },
    ],
  },
  legend: {
    onClick(e: React.MouseEvent) {
      e.stopPropagation();
    },
  },
};

export const pieColors: {
  [key: string]: string;
} = {
  [TypesOfSpec.pine]: "red",
  [TypesOfSpec.spruce]: "green",
  [TypesOfSpec.birch]: "gray",
  [TypesOfSpec.other]: "yellow",
};

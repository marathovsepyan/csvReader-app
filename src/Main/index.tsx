import React from "react";
import { BarChart } from "../Components/Chart/BarChart";
import { Pie } from "../Components/Chart/PieChart";
import { Scatterplot } from "../Components/Chart/ScatterPlot";
import { Filter } from "../Components/Filter";
import { Map } from "../Components/Map";
import { UploadButton } from "../Components/UploadButton";
import { Container } from "./styles";

import { useSelector } from "react-redux";
import { RootState } from "../Store";
import LoadingPage from "../Components/LoadingPage";
// import { Chart } from "../Components/Chart";

const Main = () => {
  const stands = useSelector((state: RootState) => state);
  console.log(stands.forest.loading);

  return (
    <div>
      <UploadButton />
      {!stands.forest.loading ? (
        stands.forest.stands.length !== 0 && (
          <div>
            <BarChart />
            <Scatterplot />
            <Pie />
            <Map />
          </div>
        )
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

export default Main;

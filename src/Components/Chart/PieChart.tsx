import React, { FC, useEffect, useMemo, useState } from "react";
import { Chart } from "./style/style";
import { useSelector } from "react-redux";
import { selectStands } from "../../Reducers/index";
import { pieColors } from "../../Utils";
import { chain } from "lodash";
import { Pie as PieChart } from "react-chartjs-2";
import { PieData } from "../../Utils/mainInterfaces";

export const Pie: FC = () => {
  const mainStand = useSelector(selectStands);
  const filteredData = useMemo<any>(() => {
    const data: number[] = [];
    const labels: string[] = [];
    const backgrounds: string[] = [];

    const species = chain(mainStand)
      .groupBy("main_species")
      .map((stands, type) => ({
        type,
        amount: stands.length,
      }))
      .value();

    species.forEach((item) => {
      labels.push(item.type);
      data.push(item.amount);
      backgrounds.push(pieColors[item.type]);
    });

    return { data, labels, backgrounds };
  }, [mainStand]);
  const [data, setData] = useState<PieData>();

  useEffect(() => {
    const { labels, data, backgrounds } = filteredData;

    const addData: any = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: backgrounds,
        },
      ],
    };

    setData(addData);
  }, [filteredData]);

  return (
    <Chart>
      {data && (
        <PieChart data={data} options={{ animation: { animateScale: true } }} />
      )}
    </Chart>
  );
};

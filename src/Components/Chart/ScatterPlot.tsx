import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectedFilter, selectFilter } from "../../Reducers/index";
import { RootState } from "../../Store";
import { options } from "../../Utils";

import { max, min, range, round, meanBy } from "lodash";
import { Chart } from "./style/style";
import { Scatter } from "react-chartjs-2";
import { Coordinate, ScatterData } from "../../Utils/mainInterfaces";

export const Scatterplot: FC = () => {
  const selectedSpecies = useSelector(selectedFilter);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mainStand = useSelector((state: RootState) =>
    selectFilter(state, selectedSpecies)
  );
  const [data, setData] = useState<ScatterData>();
  const preparedData = useMemo<{
    data: Coordinate[];
  }>(() => {
    const volumes = mainStand.map((o) => ({
      vol: round(o.relative_vol, -1),
      age: o.age,
    }));

    const maxVolume = max(volumes.map((o) => o.vol)) as number;
    const minVolume = min(volumes.map((o) => o.vol)) as number;

    const volumeKeys: {
      [key: string]: number;
    } = {};

    range(minVolume, maxVolume + 10, 10).forEach((key) => {
      volumeKeys[key.toString()] = round(
        meanBy(
          volumes.filter((o) => o.vol === key),
          "age"
        )
      );
    });

    const data: Coordinate[] = [];

    Object.entries(volumeKeys).forEach(([key, value]) => {
      data.push({ x: +key, y: value });
    });

    return { data };
  }, [mainStand]);

  useEffect(() => {
    const ctx = canvasRef.current!.getContext("2d")!;

    const gradient = ctx.createLinearGradient(
      containerRef.current!.offsetWidth,
      0,
      0,
      0
    );
    gradient.addColorStop(0, "yellow");
    gradient.addColorStop(1, "green");

    const { data } = preparedData;

    const dataset: ScatterData = {
      label: "average age",
      data,
      backgroundColor: gradient,
    };

    const addData: any = {
      datasets: [dataset],
    };

    setData(addData);
  }, [preparedData]);

  const mainOption = Object.assign(options, {
    tooltips: {
      callbacks: {
        label(tooltipItem: any) {
          return tooltipItem.yLabel;
        },
      },
    },
  });

  return (
    <Chart ref={containerRef}>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {data && <Scatter data={data} options={mainOption} />}
    </Chart>
  );
};

import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { max, round, min, range, throttle } from "lodash";
import { Chart } from "./style/style";
import { options } from "../../Utils";
import { RootState } from "../../Store";
import { selectedFilter, selectFilter } from "../../Reducers";
import { BarData } from "../../Utils/mainInterfaces";

export const BarChart: FC = () => {
  const choosedFilters = useSelector(selectedFilter);
  const mainStand = useSelector((state: RootState) =>
    selectFilter(state, choosedFilters)
  );
  const [key, setKey] = useState<number>(1);
  const [data, setData] = useState<BarData>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const incrementBarKey = useRef(
    throttle(() => {
      setKey((prev) => prev + 1);
    }, 500)
  );

  useEffect(() => {
    const onResize = () => {
      incrementBarKey.current();
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const preparedData = useMemo<{
    labels: string[];
    data: number[];
  }>(() => {
    const volumes = mainStand.map((item) => round(item.relative_vol, -1));
    const maxVolume = max(volumes) as number;
    const minVolume = min(volumes) as number;

    const volKeys: {
      [key: string]: number;
    } = {};

    range(minVolume, maxVolume + 10, 10).forEach((key) => {
      volKeys[key.toString()] = volumes.filter((o) => o === key).length;
    });

    const labels: string[] = [];
    const data: number[] = [];

    Object.entries(volKeys).forEach(([key, value]) => {
      labels.push(key);
      data.push(value);
    });

    return { labels, data };
  }, [mainStand]);

  useEffect(() => {
    const ctx = canvasRef.current!.getContext("2d")!;

    const gradient = ctx.createLinearGradient(
      containerRef.current!.offsetWidth,
      0,
      0,
      0
    );
    gradient.addColorStop(0, "gray");
    gradient.addColorStop(1, "green");

    const { labels, data } = preparedData;

    const dataset: BarData = {
      label: "# of stands",
      data,
      backgroundColor: gradient,
      borderWidth: 1,
    };

    const addData: any = {
      labels,
      datasets: [dataset],
    };

    setData(addData);
  }, [preparedData, key]);

  return (
    <Chart ref={containerRef}>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {data && <Bar data={data} options={options} />}
    </Chart>
  );
};

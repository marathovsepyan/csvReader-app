import React, { FC } from "react";
import { CSVReader } from "react-papaparse";
import { useDispatch } from "react-redux";
import { setLoading, setStands } from "../../Reducers";
import { MainTypes } from "../../Utils/mainInterfaces";

import { Filter } from "../../Components/Filter";
import { ButtonGroup, Header } from "./style";

interface IParsedData {
  data: MainTypes;
  errors: [];
  meta: object;
}

export const UploadButton: FC = () => {
  const dispatch = useDispatch();

  const handleDrop = (data: any) => {
    dispatch(setLoading(true));
    const stands: MainTypes[] = data
      .filter((o: IParsedData) => !o.errors.length)
      .map((o: IParsedData) => o.data);

    dispatch(setStands(stands));

    setTimeout(() => {
      dispatch(setLoading(false));
    }, 2300);
  };

  const readerConfig = {
    header: true,
    dynamicTyping: true,
    transformHeader(name: string) {
      switch (name) {
        case "standid":
          return "id";
        case "longitude":
          return "lng";
        case "latitude":
          return "lat";
        case "vol_m3_per_ha":
          return "relative_vol";
        case "age_years":
          return "age";
        case "size_in_ha":
          return "size";
        default:
          return name;
      }
    },
  };

  const handleError = (err: any, file: any, inputElem: any, reason: any) => {
    alert("Something went wrong!");
  };

  return (
    <Header>
      <ButtonGroup>
        <CSVReader
          onDrop={handleDrop}
          onError={handleError}
          config={readerConfig}
        >
          <p>Click to upload</p>
        </CSVReader>
      </ButtonGroup>
      <Filter />
    </Header>
  );
};

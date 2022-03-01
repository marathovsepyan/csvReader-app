/* eslint-disable react/style-prop-object */
import React, { FC, useEffect, useRef, useState } from "react";
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { selectedFilter, selectFilter } from "../../Reducers";
import { MapMouseEvent } from "mapbox-gl";
import { MainTypes } from "../../Utils/mainInterfaces";
import styled from "styled-components";

const MapLayerContainer = styled.div`
  min-width: 65%;
  canvas {
    outline: none;
  }
  .mapboxgl-map {
    width: 200px;
    max-height: 200px;
    border: grey solid 2px;
    border-radius: 20px;
  }
`;

const MapLayer = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZ29yYXJhcWVseWFuIiwiYSI6ImNsMDZzeXMwdTE0bW0zZHBkdmE5aTg3a3QifQ.lRhi8q3dkbgmcahgGQQlBA",
});

interface IPopupData {
  stand: MainTypes;
  coordinates: number[];
}

const ClosePopupContainer = styled.div`
  margin-left: auto;
  text-align: right;

  button {
    outline: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: auto;

    &:hover {
      background: #cecedc;
    }
  }
`;

interface IInitialView {
  center: [number, number];
  zoom: [number];
}

const initialView: IInitialView = {
  center: [30, 60],
  zoom: [3],
};

export const Map: FC = () => {
  const selectedSpecies = useSelector(selectedFilter);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const stands = useSelector((state: RootState) =>
    selectFilter(state, selectedSpecies)
  );

  const [popupData, setPopupData] = useState<IPopupData | null>(null);

  const handleStyleLoad = (map: mapboxgl.Map) => {
    mapRef.current = map;
  };

  const onMouseEnter = (e: MapMouseEvent) => {
    mapRef.current!.getCanvas().style.cursor = "pointer";
  };

  const onMouseLeave = () => {
    mapRef.current!.getCanvas().style.cursor = "";
  };

  const onFeatureClick = (e: any) => {
    const coordinates = e.feature.geometry.coordinates.slice();
    const stand = Object.assign({}, e.feature.properties);

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    const newPopupData: IPopupData = {
      stand,
      coordinates,
    };

    setPopupData(newPopupData);
  };

  const closePopup = () => {
    setPopupData(null);
  };

  useEffect(() => {
    closePopup();
  }, [selectedSpecies]);

  return (
    <MapLayerContainer>
      <MapLayer
        center={initialView.center}
        zoom={initialView.zoom}
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "calc(100vh - 200px)",
          width: "100%",
          minHeight: "400px",
        }}
        onStyleLoad={handleStyleLoad}
      >
        <Layer
          type="symbol"
          layout={{
            "text-field": ["get", "main_species"],
            "text-variable-anchor": ["top", "bottom", "left", "right"],
            "text-radial-offset": 1,
            "text-justify": "auto",
            "icon-image": "garden-11",
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {stands.map((stand) => (
            <Feature
              onClick={onFeatureClick}
              properties={stand}
              key={stand.id}
              coordinates={[stand.lng, stand.lat]}
            />
          ))}
        </Layer>
        <>
          {popupData && (
            <Popup
              coordinates={popupData.coordinates}
              style={{ minWidth: "200px" }}
            >
              <ClosePopupContainer>
                <button onClick={closePopup}>&times;</button>
              </ClosePopupContainer>
              <h2>{popupData.stand.main_species}</h2>
              <p>
                ID: <code>{popupData.stand.id}</code>
              </p>
              <p>
                Longitude: <code>{popupData.stand.lng}</code>
              </p>
              <p>
                Latitude: <code>{popupData.stand.lat}</code>
              </p>
              <p>
                Relative wood volume: {popupData.stand.relative_vol} m
                <sup>3</sup>/ha
              </p>
              <p>Average age: {popupData.stand.age} years</p>
              <p>Size: {popupData.stand.size} ha</p>
            </Popup>
          )}
        </>
      </MapLayer>
    </MapLayerContainer>
  );
};

"use client";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";

interface ActiveCityCoords {
  lat: number;
  lon: number;
}
function FlyToActiveCity({
  activeCityCoords,
}: {
  activeCityCoords: ActiveCityCoords;
}) {
  const map = useMap();

  useEffect(() => {
    if (activeCityCoords) {
      const zoomLev = 13;
      const flyToOptions = {
        duration: 1.5,
      };
      map.flyTo(
        [activeCityCoords.lat, activeCityCoords.lon],
        zoomLev,
        flyToOptions
      );
    }
  }, [activeCityCoords, map]);
  return null;
}

function Mapbox() {
  const { forecast } = useGlobalContext();
  const activeCityCoords = forecast?.coord;

  if (!forecast || !forecast.coord || !activeCityCoords) {
    return <Skeleton className="h-[33rem] w-full " />;
  }
  return (
    <div className="flex-1 basis-[50%] border rounded-lg">
      <MapContainer
        center={[activeCityCoords.lat, activeCityCoords.lon]}
        zoom={13}
        scrollWheelZoom={false}
        className="rounded-lg m-4"
        style={{ height: "calc(100% - 2rem)", width: "calc(100% - 2rem)" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <FlyToActiveCity activeCityCoords={activeCityCoords} />
      </MapContainer>
    </div>
  );
}

export default Mapbox;

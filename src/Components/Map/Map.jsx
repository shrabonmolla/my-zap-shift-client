import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import themeOrder from "daisyui/functions/themeOrder";
export default function Map() {
  const position = [23.70895, 90.41066];
  const [mapData, setMapData] = useState(null);
  const mapRef = useRef();
  useEffect(() => {
    fetch("/map.json")
      .then((res) => res.json())
      .then((data) => setMapData(data));
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    const searchedLoacaiton = e.target.search.value;
    const district = mapData.find((d) =>
      d.district.toLowerCase().includes(searchedLoacaiton.toLowerCase())
    );
    if (district) {
      const coor = [district.latitude, district.longitude];
      mapRef.current.flyTo(coor, 10);
    }
  }
  return (
    <div>
      {/* search bar */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Large"
          className="input input-lg"
        />
        <input type="submit" value="Search" />
      </form>
      <MapContainer
        className=" h-[500px] w-full"
        center={position}
        zoom={8}
        scrollWheelZoom={true}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapData &&
          mapData.map((distirct, index) => {
            return (
              <Marker
                key={index}
                position={[distirct.latitude, distirct.longitude]}
              >
                <Popup>{distirct.city}</Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
}

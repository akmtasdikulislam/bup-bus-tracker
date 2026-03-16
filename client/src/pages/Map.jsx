import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";

const ROUTE_GEOMETRY =
  "ifopC}_ofP~AEGgAz@KjBOj@ErDUz@G~@GEy@A}@IgAGaAMeBK}AG[IOKUCUEU?_@@]FqAJuADcCGOAOCKCQ@w@EwB@YBm@IgFAy@G_EMoJEa@COEkDB[GyDEkEGWKuDMcDB]CmA?KB[Fs@DUFYJa@P]??HWHQVYFIBEHGFIHKJGLIPIVG`@Cr@ExAI^AL?LAjAEVCb@IRELCJ?|BDtACr@AzCGbACjIIn@CNC??XCr@MTEfBUfEi@PAhAIj@?tA?jBCnBIb@ElAK|AOfGg@b@ENEJCJGFIDGBK@I?SCSW_CM{@GSGSWw@CWASA[@U@QDQDQL[Vg@l@aAb@m@jA{B^s@n@_Ar@cAhAaBP]`AaBP_@PYL_@Lg@\\sBFm@`@mDx@yGDs@Bm@?S?OCw@Ci@Go@OcBOs@GQIQQW_BiB_B_BSYw@{Ay@}Au@oASg@i@uACE?G?EBGBEDCFADCh@]f@[|@u@fAkAhAgAvAkAz@q@HQHKhCyBfEmDTQnAeA^[nBsA`@_@JMJMN_@L_@^eBZcBJo@Bc@{BC??sCQsBQiADeAHm@Lg@JkCn@QJEFGFI@IAGEEI?K@IFGHEH@HB@BTAr@S`@IzA]dAWl@EjAAt@Bz@LfAHpABxBFb@?`B?l@?jCCH?dD?NA^AVBTBd@Hl@LjCf@zCt@xCp@d@HPBf@F|CXdDJrDRlFVv@Jz@P`@Jf@P^N^P|ChB`@V`@ZXRJJhAnAhClChFvFVVRJ~@b@z@^fErATDhB^JBdBVbEv@|Dt@bB^L@J@fANvARF@FKHCF?H?RDJ@F@JDHBDDBD?H|Bb@rAR~Fl@hFb@h@Hz@PfAZPHdG`B\\Hz@JRB\\Dv@H~@Hj@Hj@Ln@LzKpCz@RxCp@dARx@Lz@HhAHfBDzDD|DFbFG|AG|AMdEWdHg@";

const WAYPOINTS = [
  { location: [90.357906, 23.839886], name: "Transportation Road of BUP" },
  { location: [90.375704, 23.837464], name: "Link Road 9 (West)" },
  { location: [90.376865, 23.830187], name: "Link Road 9 (Mid)" },
  { location: [90.378078, 23.823127], name: "শেখ তামিম বিন হামাদ সড়ক" },
  { location: [90.393583, 23.822552], name: "ECB Chattar" },
  { location: [90.397139, 23.818568], name: "Near ECB Chattar" },
  { location: [90.400214, 23.817137], name: "কুর্মিটোলা সড়ক (North)" },
  { location: [90.400115, 23.820058], name: "কুর্মিটোলা সড়ক (Junction)" },
  { location: [90.400323, 23.813798], name: "কুর্মিটোলা সড়ক (Mid-North)" },
  { location: [90.393999, 23.799345], name: "কুর্মিটোলা সড়ক (Mid)" },
  { location: [90.392996, 23.795099], name: "কুর্মিটোলা সড়ক (Mid-South)" },
  { location: [90.391161, 23.788432], name: "কুর্মিটোলা সড়ক (South)" },
  { location: [90.389894, 23.775758], name: "Destination" },
];

const START_WAYPOINT = WAYPOINTS[0];
const END_WAYPOINT = WAYPOINTS[WAYPOINTS.length - 1];
const STOP_WAYPOINTS = WAYPOINTS.slice(1, -1);

function decodePolyline(encoded, precision = 5) {
  const factor = Math.pow(10, precision);
  const coords = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let shift = 0;
    let result = 0;
    let byte;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    lat += result & 1 ? ~(result >> 1) : result >> 1;

    shift = 0;
    result = 0;
    do {
      byte = encoded.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);
    lng += result & 1 ? ~(result >> 1) : result >> 1;

    coords.push([lng / factor, lat / factor]);
  }

  return coords;
}

function createStopMarkerEl(number) {
  const el = document.createElement("div");
  el.style.cssText = "cursor:pointer;width:32px;height:40px;";
  el.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40" width="32" height="40">
      <path d="M16 0C9.373 0 4 5.373 4 12c0 9 12 28 12 28S28 21 28 12C28 5.373 22.627 0 16 0z"
            fill="#0074D9" stroke="#ffffff" stroke-width="2"/>
      <circle cx="16" cy="12" r="8" fill="#ffffff"/>
      <text x="16" y="16" text-anchor="middle" font-size="9" font-weight="700"
            font-family="sans-serif" fill="#0074D9">${number}</text>
    </svg>`;
  return el;
}

function popupHTML(title, subtitle = "") {
  return `
    <div style="
      background:#1e293b;
      color:#f1f5f9;
      border-radius:8px;
      padding:10px 14px;
      font-family:sans-serif;
      min-width:140px;
    ">
      <div style="font-size:13px;font-weight:700;margin-bottom:${subtitle ? "4px" : "0"}">${title}</div>
      ${subtitle ? `<div style="font-size:11px;color:#94a3b8;">${subtitle}</div>` : ""}
    </div>`;
}

const Map = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
     
    const style = document.createElement("style");
    style.textContent = `
      .mapboxgl-popup-content {
        background: transparent !important;
        padding: 0 !important;
        box-shadow: none !important;
        border-radius: 8px !important;
      }
      .mapboxgl-popup-tip { display: none !important; }
      .mapboxgl-popup-close-button {
        color: #94a3b8 !important;
        font-size: 16px !important;
        right: 6px !important;
        top: 4px !important;
      }
    `;
    document.head.appendChild(style);

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    const center = [
      (START_WAYPOINT.location[0] + END_WAYPOINT.location[0]) / 2,
      (START_WAYPOINT.location[1] + END_WAYPOINT.location[1]) / 2,
    ];

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center,
      zoom: 12,
    });

    mapInstanceRef.current = map;

    new mapboxgl.Marker({ color: "#22c55e" })
      .setLngLat(START_WAYPOINT.location)
      .setPopup(
        new mapboxgl.Popup({ offset: 30 }).setHTML(
          popupHTML("Start", START_WAYPOINT.name),
        ),
      )
      .addTo(map);

    new mapboxgl.Marker({ color: "#ef4444" })
      .setLngLat(END_WAYPOINT.location)
      .setPopup(
        new mapboxgl.Popup({ offset: 30 }).setHTML(popupHTML("End")),
      )
      .addTo(map);

    STOP_WAYPOINTS.forEach((wp, idx) => {
      const stopNumber = idx + 1;
      const label = wp.name || `Stop ${stopNumber}`;

      new mapboxgl.Marker({ element: createStopMarkerEl(stopNumber), anchor: "bottom" })
        .setLngLat(wp.location)
        .setPopup(
          new mapboxgl.Popup({ offset: 10 }).setHTML(
            popupHTML(`Stop ${stopNumber}`, label),
          ),
        )
        .addTo(map);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          new mapboxgl.Marker({ color: "#f59e0b" })
            .setLngLat(userCoords)
            .setPopup(
              new mapboxgl.Popup({ offset: 30 }).setHTML(
                popupHTML("You are here"),
              ),
            )
            .addTo(map);
        },
        () => {
           
        },
      );
    }

    map.on("load", () => {
      const routeCoordinates = decodePolyline(ROUTE_GEOMETRY, 5);

      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: { name: "BUP Bus Route" },
          geometry: { type: "LineString", coordinates: routeCoordinates },
        },
      });

      map.addLayer({
        id: "route-outline",
        type: "line",
        source: "route",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#ffffff", "line-width": 9 },
      });

      map.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-color": "#0074D9", "line-width": 5 },
      });

      const bounds = routeCoordinates.reduce(
        (b, coord) => b.extend(coord),
        new mapboxgl.LngLatBounds(routeCoordinates[0], routeCoordinates[0]),
      );
      map.fitBounds(bounds, { padding: 60 });
    });

    return () => {
      document.head.removeChild(style);
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <div
      id="map-container"
      style={{ width: "100%", height: "100vh", position: "absolute" }}
    >
      <div
        ref={mapRef}
        id="map"
        style={{ height: "100%", position: "absolute", width: "100%" }}
      />
    </div>
  );
};

export default Map;

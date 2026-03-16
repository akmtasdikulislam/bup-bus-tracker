import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";

// Main polyline — encoded polyline (precision 6) from the route API
const ROUTE_POLYLINE =
  "skepl@yjrlkDiCNuMk@_K{@mH_A}KsAiQcCf@n\\f[|Ddq@rBzFCxXEzl@KhZGfy@Oxe@ICzIps@bA~b@n@r\\d@dgA|AKfe@p]`@wAy[gB_`@fCL??????????gCM[eHeaDiHmW{@uYw@wTOkQQeUZc]B{W^cWEoUIc`@YyEMi@mGIqEfh@ShSP|PSd_@k@bUDd\\SrVQtTZxVhAl]zAv@B`o@xAniBtGfGK~c@hAjSv@d_@hBdg@tBdW~@nOL|wBhGta@f@hT@dL?bMs@v^aDnf@cNpOyGbT{KpUoNt[eWbp@mf@xw@cm@l_@qX~X{UhScPbV_SpY{Uvh@ub@pSeQdBsA|KyInm@me@`g@g`@pHcHt\\eXdl@_b@j[iOvO{KtJ_HbRqOziAw`A~d@w^|V_QpLeJ`[sW|nA_`AbDgCn^iZzi@wa@t[_WxlAw}@rK{I|IgHbCoBtT}Qjh@}e@|\\y[nZ}RhQoJ`EqBzn@oWdT_LlRwIzH_DdMiFdP{F~SiFtYoHzTiFbImBfVaFrPiCrJ{AjOsBlUoCdBUxd@kE`cAmL|y@yHpoDg\\bmAyLdOmA~[cCvNuApc@oD|ZqCz_@}DtZ_DfJi@dSu@~JExNV`Sv@xHd@nIv@~MtBzKbBlFdAfIvAdSlFvJdDxHdDlGnCpIvEhDbB`JpFhEfCxDbCjHtF`HtFbFjEpElEnD|DxD|E`DxDnFpHvEjHvEjHlFzI~KjR`Wnc@zRb^tq@zlAlBfDlTx^x_BhuCbGfNlF`OxD|L~ChM~@vGb@rFd@vFRjHAxNKfMk@zViAzi@uG[hBev@JeEXqNCsOKeGc@}Go@cGw@iGwCqNgEgOqFgMiHuMeUc`@_E|BcEvAif@LkBF_FoMnB_B`@oAU{Da@}A`@|ATzDa@nAoB~A~EnMjBGhf@MnKxPdMvXzJz[vDlLzC`NnB``@NxVqEtwAXrJqDzcA_@fXOrLTtMdBjPfBtN|F|W|BbEnKdQlDdH`CxMhBpHzA~OfCH|B?rDEbBVhC~@`ClAlCbCgCxNu@|Es@zG_Bz^gBr~@oBjcA_@`NJpQJh^JhF?xDY`Hs@zGkApGqCnLkFtWsF|Zy@nFiClGeCvGwBrD}AxBgFjEsEvEsEhDcIlFkKfIgk@za@cBtA_MbKmRrNeBpAcHtFocAv{@}CdCeMxLmQ`Qs^d^cIlG_F`AqN`PgOrMkQfN[nAs@`AcAj@mANoAMeAg@u@aAY{@Ec@C]BcAZiAn@_A|@k@fASfADbAZx@r@f@`APlACnA[nAxApHhDjN`DzIbD`H~T|a@lWpb@hCpDn_@pb@pPjQ`M`OzDfHnBhGdBnHxAhIrC|V|AfR~@dSFlOIvB[xRu@fNmAbLyLniAcLj~@oDfViFb[qEjQmDfJgDvGoTp\\}OxVsWn]wJlMsQ`ZaHbNwEfJgH~NsAdHiGzPkNbZeApEu@rEGtDPpGb@`Ef@|CtBzIrCrIj@fClEdX~Fvf@~A~Rl@pIOjAcAtB}@nAy@dAgBdCyBbByBjAqCd@yC\\iCViALkJv@wl@tEym@jEyc@xC}DJ{C?kCIsCLgPd@uW~@kW~@c^tCiKd@eIRyID{BAuONeKNoIT_UfBmVjByWtCcPtBc@pAy@~@??y@`@_ANaACw@So@_@cFa@_]l@ybAl@s^r@av@|Cag@nByi@~FiDNeEOaGu@oHGyyAhD_KzAmFjBsGvCgKhIwCnC_HxGaDvHaChIsAhGy@dFiAvNg@zGCtBn@~Tt@zEb@nCt@xQf@`Lx@fSvAvp@CvAAb@CpAQ~Fr@x~@pAzx@n@rEvBdw@OtCMpBWfFpCpqBlAh{@TdQ|AbgAhB~MVpNXvS^bSZxFTd@Hh@Cj@Oh@[^e@T@jB?lG{@ng@oB|Y_BpXOfH?xHx@lFr@rExBtEzA`DfAvGvBl\\xC~^nAxSrA`Ud@vRj@xPyRrAwQlAcw@zEaMbAi`@|C}QhBgu@nHd@hPDnBZ`L";

// Decode a precision-6 encoded polyline into [lng, lat] pairs
function decodePolyline(encoded, precision = 6) {
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

// Route boundary coordinates
const START_COORDS = [90.400475, 23.874764]; // [lng, lat]
const END_COORDS = [90.357627, 23.840057]; // [lng, lat]

// Intermediate stop coordinates
const ROUTE_STOP_COORDS = [
  [90.400475238871, 23.87476487300019],
  [90.40014599654164, 23.86786734842594],
  [90.40014599654164, 23.86786734842594],
  [90.40014599654164, 23.86786734842594],
  [90.40014599654164, 23.86786734842594],
  [90.40014599654164, 23.86786734842594],
  [90.40014599654164, 23.86786734842594],
  [90.41348031020468, 23.81846254018675],
  [90.39343117554971, 23.822580548620575],
  [90.37755672153509, 23.823318405666885],
  [90.3766024542115, 23.830106819710537],
  [90.3766024542115, 23.830106819710537],
  [90.3576278677055, 23.84005784721201],
];

const Map = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    const center = [
      (START_COORDS[0] + END_COORDS[0]) / 2,
      (START_COORDS[1] + END_COORDS[1]) / 2,
    ];

    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center,
      zoom: 12,
    });

    mapInstanceRef.current = map;

    // Start marker
    new mapboxgl.Marker({ color: "#22c55e" })
      .setLngLat(START_COORDS)
      .setPopup(new mapboxgl.Popup().setText("Start"))
      .addTo(map);

    // End marker
    new mapboxgl.Marker({ color: "#ef4444" })
      .setLngLat(END_COORDS)
      .setPopup(new mapboxgl.Popup().setText("End"))
      .addTo(map);

    // Intermediate stop markers
    ROUTE_STOP_COORDS.forEach((coords, idx) => {
      const el = document.createElement("div");
      el.style.cssText =
        "width:28px;height:28px;background:#0074D9;border:2px solid #fff;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:bold;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.4)";
      el.textContent = `P${idx + 1}`;

      new mapboxgl.Marker({ element: el })
        .setLngLat(coords)
        .setPopup(new mapboxgl.Popup().setText(`Stop P${idx + 1}`))
        .addTo(map);
    });

    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = [
            position.coords.longitude,
            position.coords.latitude,
          ];
          new mapboxgl.Marker({ color: "#f59e0b" })
            .setLngLat(userCoords)
            .setPopup(new mapboxgl.Popup().setText("You are here"))
            .addTo(map);
        },
        () => {
          // Location denied — do nothing extra
        },
      );
    }

    // Draw the route polyline after the map style loads
    map.on("load", () => {
      const routeCoordinates = decodePolyline(ROUTE_POLYLINE, 6);

      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: { name: "Route" },
          geometry: {
            type: "LineString",
            coordinates: routeCoordinates,
          },
        },
      });

      map.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#0074D9",
          "line-width": 5,
        },
      });

      // Fit the map to the route bounds
      const bounds = routeCoordinates.reduce(
        (b, coord) => b.extend(coord),
        new mapboxgl.LngLatBounds(routeCoordinates[0], routeCoordinates[0]),
      );
      map.fitBounds(bounds, { padding: 40 });
    });

    return () => {
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

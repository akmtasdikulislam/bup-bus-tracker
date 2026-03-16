import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";
import { useEffect, useRef } from "react";

// Main polyline from your API response
const ROUTE_POLYLINE =
  "skepl@yjrlkDiCNuMk@_K{@mH_A}KsAiQcCf@n\\f[|Ddq@rBzFCxXEzl@KhZGfy@Oxe@ICzIps@bA~b@n@r\\d@dgA|AKfe@p]`@wAy[gB_`@fCL??????????gCM[eHeaDiHmW{@uYw@wTOkQQeUZc]B{W^cWEoUIc`@YyEMi@mGIqEfh@ShSP|PSd_@k@bUDd\\SrVQtTZxVhAl]zAv@B`o@xAniBtGfGK~c@hAjSv@d_@hBdg@tBdW~@nOL|wBhGta@f@hT@dL?bMs@v^aDnf@cNpOyGbT{KpUoNt[eWbp@mf@xw@cm@l_@qX~X{UhScPbV_SpY{Uvh@ub@pSeQdBsA|KyInm@me@`g@g`@pHcHt\\eXdl@_b@j[iOvO{KtJ_HbRqOziAw`A~d@w^|V_QpLeJ`[sW|nA_`AbDgCn^iZzi@wa@t[_WxlAw}@rK{I|IgHbCoBtT}Qjh@}e@|\\y[nZ}RhQoJ`EqBzn@oWdT_LlRwIzH_DdMiFdP{F~SiFtYoHzTiFbImBfVaFrPiCrJ{AjOsBlUoCdBUxd@kE`cAmL|y@yHpoDg\\bmAyLdOmA~[cCvNuApc@oD|ZqCz_@}DtZ_DfJi@dSu@~JExNV`Sv@xHd@nIv@~MtBzKbBlFdAfIvAdSlFvJdDxHdDlGnCpIvEhDbB`JpFhEfCxDbCjHtF`HtFbFjEpElEnD|DxD|E`DxDnFpHvEjHvEjHlFzI~KjR`Wnc@zRb^tq@zlAlBfDlTx^x_BhuCbGfNlF`OxD|L~ChM~@vGb@rFd@vFRjHAxNKfMk@zViAzi@uG[hBev@JeEXqNCsOKeGc@}Go@cGw@iGwCqNgEgOqFgMiHuMeUc`@_E|BcEvAif@LkBF_FoMnB_B`@oAU{Da@}A`@|ATzDa@nAoB~A~EnMjBGhf@MnKxPdMvXzJz[vDlLzC`NnB``@NxVqEtwAXrJqDzcA_@fXOrLTtMdBjPfBtN|F|W|BbEnKdQlDdH`CxMhBpHzA~OfCH|B?rDEbBVhC~@`ClAlCbCgCxNu@|Es@zG_Bz^gBr~@oBjcA_@`NJpQJh^JhF?xDY`Hs@zGkApGqCnLkFtWsF|Zy@nFiClGeCvGwBrD}AxBgFjEsEvEsEhDcIlFkKfIgk@za@cBtA_MbKmRrNeBpAcHtFocAv{@}CdCeMxLmQ`Qs^d^cIlG_F`AqN`PgOrMkQfN[nAs@`AcAj@mANoAMeAg@u@aAY{@Ec@C]BcAZiAn@_A|@k@fASfADbAZx@r@f@`APlACnA[nAxApHhDjN`DzIbD`H~T|a@lWpb@hCpDn_@pb@pPjQ`M`OzDfHnBhGdBnHxAhIrC|V|AfR~@dSFlOIvB[xRu@fNmAbLyLniAcLj~@oDfViFb[qEjQmDfJgDvGoTp\\}OxVsWn]wJlMsQ`ZaHbNwEfJgH~NsAdHiGzPkNbZeApEu@rEGtDPpGb@`Ef@|CtBzIrCrIj@fClEdX~Fvf@~A~Rl@pIOjAcAtB}@nAy@dAgBdCyBbByBjAqCd@yC\\iCViALkJv@wl@tEym@jEyc@xC}DJ{C?kCIsCLgPd@uW~@kW~@c^tCiKd@eIRyID{BAuONeKNoIT_UfBmVjByWtCcPtBc@pAy@~@??y@`@_ANaACw@So@_@cFa@_]l@ybAl@s^r@av@|Cag@nByi@~FiDNeEOaGu@oHGyyAhD_KzAmFjBsGvCgKhIwCnC_HxGaDvHaChIsAhGy@dFiAvNg@zGCtBn@~Tt@zEb@nCt@xQf@`Lx@fSvAvp@CvAAb@CpAQ~Fr@x~@pAzx@n@rEvBdw@OtCMpBWfFpCpqBlAh{@TdQ|AbgAhB~MVpNXvS^bSZxFTd@Hh@Cj@Oh@[^e@T@jB?lG{@ng@oB|Y_BpXOfH?xHx@lFr@rExBtEzA`DfAvGvBl\\xC~^nAxSrA`Ud@vRj@xPyRrAwQlAcw@zEaMbAi`@|C}QhBgu@nHd@hPDnBZ`L";

// Start and end coordinates (from the first and last leg)
const START_COORDS = [90.400475, 23.874764]; // [lng, lat]
const END_COORDS = [90.357627, 23.840057]; // [lng, lat]

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    Radar.initialize("prj_test_pk_38e6576bdd61ed57be05f3c0796eaa017b9864a5");

    // Center the map between start and end
    const center = [
      (START_COORDS[0] + END_COORDS[0]) / 2,
      (START_COORDS[1] + END_COORDS[1]) / 2,
    ];

    const map = Radar.ui.map({
      container: mapRef.current,
      style: "radar-default-v1",
      center,
      zoom: 12,
    });

    // Add markers for start and end
    Radar.ui.marker({ text: "Start" }).setLngLat(START_COORDS).addTo(map);
    Radar.ui.marker({ text: "End" }).setLngLat(END_COORDS).addTo(map);

    // Add route markers
    const routeMarkers = [
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
    routeMarkers.forEach((coords, idx) => {
      Radar.ui
        .marker({
          text: `P${idx + 1}`,
          url: "https://cdn-icons-png.flaticon.com/256/3448/3448339.png",
        })
        .setLngLat(coords)
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
          Radar.ui.marker({ text: "You" }).setLngLat(userCoords).addTo(map);
        },
        () => {
          // Location denied, do nothing extra
        },
      );
    }

    // Draw the route polyline after map loads
    map.on("load", () => {
      map.addPolyline(ROUTE_POLYLINE, {
        id: "route-polyline",
        precision: 6,
        properties: {
          name: "Route",
        },
        paint: {
          "line-color": "#0074D9",
          "line-width": 5,
        },
      });

      // Fit map to route and markers
      map.fitToFeatures({ padding: 40 });
    });

    mapRef.current._radarMapInstance = map;

    // Cleanup on unmount
    return () => {
      if (mapRef.current && mapRef.current._radarMapInstance) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mapRef.current._radarMapInstance.remove();
      }
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

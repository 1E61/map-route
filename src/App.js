import { MapContainer, TileLayer, useMap } from "react-leaflet";
import React, { useState, useEffect } from "react";
import { Drawer, Button } from 'antd';
import "./index.css";
import 'antd/dist/antd.css';
import "leaflet/dist/leaflet.css";
//для кнопки start надо
import L from "leaflet";
import Routing from "./Routing";

const initialStateWaypoints = {
  lat1: 0,
  lng1: 0,
  lat2: 0,
  lng2: 0
};

export default function App() {
  const position = [55.014, 82.89];
  const data = [
    { nameOrder: "заявка 1", lat1: 55.014784595581446, lng1: 82.89010696464834, lat2: 55.0341673778342, lng2: 82.97961464149465, key: "cgt", desc: "срочная доставка" },
    { nameOrder: "заявка 2", lat1: 55.002784595581446, lng1: 82.88010696464834, lat2: 55.0441673778342, lng2: 82.96961464149465, key: "brf", desc: "доставка после 17" },
    { nameOrder: "заявка 3", lat1: 55.025784595581446, lng1: 82.89110696464834, lat2: 55.0342673778342, lng2: 82.96961464149465, key: "zse", desc: "необходимо позвонить" },
    { nameOrder: "заявка 4", lat1: 55.000184595581446, lng1: 82.89090696464834, lat2: 55.0351673778342, lng2: 82.91961464149465, key: "ofy", desc: "хрупкий груз" }

  ]

  return (
    <div>


      <MapContainer center={position} zoom={13} style={{ height: "100vh" }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <SetDrawer dataOrder={data} />


      </MapContainer>

    </div>
  );
}

const SetDrawer = (props) => {
  const [visible, setVisible] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(256);




  const showDrawer = () => {
    console.log("opened");
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onMouseDown = e => {
    setIsResizing(true);
  };

  const onMouseUp = e => {
    setIsResizing(false);
  };

  const onMouseMove = e => {
    if (isResizing) {
      let offsetRight =
        document.body.offsetWidth - (e.clientX - document.body.offsetLeft);
      const minWidth = 50;
      const maxWidth = 600;
      if (offsetRight > minWidth && offsetRight < maxWidth) {
        setWidth(offsetRight);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  });

  return (
    <>
      <Button className="button1" type="primary" onClick={showDrawer}>
        Начать работу
      </Button>
      {/* <StartButton onClick={showDrawer} count={visible} /> */}
      {/* <StartButton visible={visible}/> */}

      <Drawer
        title="Список заказов"
        placement="right"
        closable={false}
        onClose={onClose}
        open={visible}
        width={width}
      >
        <div
          style={{
            position: "absolute",
            width: "5px",
            padding: "4px 0 0",
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: 100,
            cursor: "ew-resize",
            backgroundColor: "#f4f7f9"
          }}
          onMouseDown={onMouseDown}
        />

        <OrderListSpace dataOrder={props.dataOrder} />


      </Drawer>

    </>
  );
};

function FreeSpace(props) {
  return (
    <div>

    </div>
  );
}

function OrderListSpace(props) {


  const elements = props.dataOrder.map((item) => {
    const { key, nameOrder, lat1, lng1, lat2, lng2, desc } = item;
    return (
      <div key={key}>
        {desc}
        <OrderSpace a={nameOrder} lat1={lat1} lng1={lng1} lat2={lat2} lng2={lng2} />
      </div>
    )

  });

  return (
    <div>
      {elements}
    </div>
  );
}


function OrderSpace(props) {

  const [flag, setFlag] = useState(false);
  const [waypoints, setWaypoints] = useState(initialStateWaypoints);

  // const { nameOrder, lat1, lng1, lat2, lng2 } = props.a;

  const handleClick = () => {

    //() => 
    setFlag(!flag);
    //setWaypoints(waypoints => waypoints.concat(`${waypoints.length}`))
    if (flag != true) {
      setWaypoints({
        lat1: props.lat1,
        lng1: props.lng1,
        lat2: props.lat2,
        lng2: props.lng2
      })
    } else {
      setWaypoints(initialStateWaypoints);
    }

  };


  return (
    <div>
      <Button type={flag ? "primary" : "default"} size="large" className="button1" onClick={() => handleClick()}>
        {props.a}
        {waypoints.lat1 > 0 ? <Routing a={waypoints} /> : <FreeSpace a={waypoints} />}
      </Button>

    </div>
  )
}

/* const StartButton = ({ onClick }, { visible }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const buttonControl = L.control({
      position: "topleft"
    });

    buttonControl.onAdd = function (map) {
      this._div = L.DomUtil.create('button');
      this._div.type="button";
      this._div.title="НАЧАТЬ РАБОТУ";
      const buttonElement = `<button class="primary" type="primary">НАЧАТЬ РАБОТУ</button>`;

      this._div.innerHTML = buttonElement; 

       this._div.addEventListener("click", ({ onClick }) => { onClick });
      this._div.onclick = { onClick };

      return this._div;
    };

    buttonControl.addTo(map);

     return () => {
      map.remove(buttonControl);
    };
  }, [map]);

  //return null; 
} */
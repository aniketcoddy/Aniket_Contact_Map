import React from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import Axios from "axios"
import { useQuery } from '@tanstack/react-query';

interface MapData {
  countryInfo: {
    _id: number;
    lat: number;
    long: number;
  };
  country: string;
  active: number;
  cases: number;
  deaths: number;
  recovered: number;
}

function Mapping() {

  const { data: mapData , isLoading } = useQuery<MapData[]>(["mapps"] , async()=>{
    return Axios.get("https://disease.sh/v3/covid-19/countries").then((res)=>res.data)
  })

  const customIcon = new Icon( {
    iconUrl:"destination.png",
    iconSize:[20 , 20]
  }) 

  if(isLoading){
    return (
      <div className='flex justify-center items-center mt-56'>
        <span className='w-16 h-16 border-8 border-t-8 border-t-red-500 animate-spin rounded-full'></span>
      </div>
    )
  }

  if (!mapData || mapData.length === 0) {
    return <h1>No data available</h1>;
  }

  document.title = "Covid Map";

  return (
    <div className='mt-10 3xl:mt-6 flex flex-col justify-center items-center -z-20 2xl:mt-4 '>
      <div className='font-[Roboto] text-5xl 3xl:text-4xl 2xl:text-3xl lg:text-2xl xs:text-xl  text-white font-semibold flex justify-center items-center xs:gap-2 gap-3'> Map Of
        <span className='font-[Roboto] text-5xl 2xl:text-3xl 3xl:text-4xl xs:text-xl lg:text-2xl  text-[#00C66C] font-semibold'>
          Covid Infected Countries
        </span>
      </div>
      <div className='font-[Roboto] flex text-2xl 2xl:text-lg md:text-sm 3xl:text-xl xs:text-xs lg:text-base xxs:text-[10px] mt-10 3xl:mt-4 2xl:mt-2 text-white'>
         Please click on the <span><img src="destination.png" className="w-8 2xl:w-6 xs:w-5 xxs:w-4"/></span>icon to see the data of a specific country.
      </div>

      <div className='h-[750px] w-[1600px] 3xl:h-[500px] 3xl:w-[1500px] 2xl:h-[430px] 2xl:w-[1350px] lg:h-[350px] md:w-[750px] md:h-[380px] lg:w-[980px]  xs:w-[390px] xxs:w-[350px] xs:h-[500px] xm:w-[250px] xs:mt-8 mt-8 3xl:mt-4'>
        <MapContainer center={[20.5937, 78.9629]} zoom={2.5} style={{ height: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://api.maptiler.com/maps/topo-v2/256/{z}/{x}/{y}.png?key=ebe50HaKTNGo3zBGrFa4"
          />

          {mapData.map((item) => {
            return (
              <Marker
                key={item.countryInfo._id}
                position={[item.countryInfo.lat, item.countryInfo.long]} icon={customIcon}>
                <Popup>
                  <div>
                    <ul className=' flex flex-col gap-1'>
                      <li className='font-[Poppins] font-semibold text-xs '>Country: <span className='font-[Poppins] font-bold text-green-700'>{item.country}</span></li>
                      <li className='font-[Poppins] font-semibold text-xs '>Active: <span className='font-[Poppins] font-normal '>{item.active}</span></li>
                      <li className='font-[Poppins] font-semibold text-xs '>Cases: <span className='font-[Poppins] font-normal '>{item.cases}</span></li>
                      <li className='font-[Poppins] font-semibold text-xs '>Deaths: <span className='font-[Poppins] font-normal '>{item.deaths}</span></li>
                      <li className='font-[Poppins] font-semibold text-xs '>Recovered: <span className='font-[Poppins] font-normal '>{item.recovered}</span></li>
                    </ul>
                  </div>
                </Popup>
              </Marker>
            )
          })}

        </MapContainer>
      </div>
    </div>
  )
}

export default Mapping;

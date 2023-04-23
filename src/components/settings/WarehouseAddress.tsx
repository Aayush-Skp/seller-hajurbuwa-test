import React, { useEffect, useState } from 'react';
import Button from '../common/Button';
import InputLabel from '../common/InputLabel';
import TextInput from '../common/TextInput';
import { getAllLocation } from '../../services/getLocations';

type State = {
  state_id: string | number;
  state_name: string;
  city: City[];
};

type City = {
  city_id: string | number;
  city_name: string;
  state_id: string;
  area: Area[];
};

type Area = {
  area_id: string | number;
  area_name: string;
  city_id: string;
};

export default function WarehouseAddress() {
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [stateList, setStateList] = useState<State[]>([]);
  const [cityList, setCityList] = useState<City[]>([]);
  const [areaList, setAreaList] = useState<Area[]>([]);
  const [locationDetails, setLocationDetails] = useState({
    state: '',
    city: '',
    area: '',
    addressLine1: '',
    addressLine2: '',
  });

  const [location, setLocation] = useState<{
    state_id: string;
    city_id: string;
    area_id: string;
  }>({
    state_id: '',
    city_id: '',
    area_id: '',
  });

  function handleStateChange(state_id: string) {
    for (const state of stateList) {
      if (`${state.state_id}` === state_id) {
        setCityList(state?.city ?? []);
      }
    }
    setLocation({
      state_id,
      city_id: '',
      area_id: '',
    });
    setAreaList([]);
  }

  function handleCityChange(city_id: string) {
    for (const city of cityList) {
      if (`${city.city_id}` === city_id) {
        setAreaList(city?.area ?? []);
      }
    }
    setLocation({
      ...location,
      city_id,
      area_id: '',
    });
  }

  function handleAreaChange(area_id: string) {
    setLocation({
      ...location,
      area_id,
    });
  }

  useEffect(() => {
    getAllLocation()
      .then((res) => {
        let details: any = localStorage.getItem('userDetails');
        if (typeof details === 'string') {
          details = JSON.parse(details);

          setStateList(res);
          setLocationDetails({
            state: details.state,
            city: details.city,
            area: details.area,
            addressLine1: details.address_line1,
            addressLine2: details.address_line2,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="space-y-10">
      <div className="space-y-5">
        <div className="flex space-x-10 items-center">
          <span className="w-36">State</span>
          <span className="w-80 border border-black h-10 px-5 flex items-center">
            {locationDetails.state}
          </span>
        </div>
        <div className="flex space-x-10 items-center">
          <span className="w-36">City</span>
          <span className="w-80 border border-black h-10 px-5 flex items-center">
            {locationDetails.city}
          </span>
        </div>
        <div className="flex space-x-10 items-center">
          <span className="w-36">Area</span>
          <span className="w-80 border border-black h-10 px-5 flex items-center">
            {locationDetails.area}
          </span>
        </div>
      </div>
      <div className="space-y-5">
        <div className="flex justify-center">
          <span className="text-2xl text-accent-primary bg-gray-200 p-2">
            Update Your Warehouse Details
          </span>
        </div>
        <form className="flex flex-col space-y-5">
          <div className="flex space-x-10 items-center">
            <div className="w-36">
              <InputLabel required className="text-xl" label="State" />
            </div>
            <div className="w-80">
              <select
                onChange={(e) => handleStateChange(e.target.value)}
                className="w-full h-10 outline-none border border-black rounded cursor-pointer select-none"
              >
                <option value="">select a state</option>
                {stateList.map((state: State) => (
                  <option
                    key={state.state_id}
                    value={`${state.state_id}`}
                    selected={location.state_id === `${state.state_id}`}
                  >
                    {state.state_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex space-x-10 items-center">
            <div className="w-36">
              <InputLabel required className="text-xl" label="City" />
            </div>
            <div className="w-80">
              <select
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full h-10 outline-none border border-black rounded cursor-pointer select-none"
              >
                <option value="">select a city</option>
                {cityList.map((city: City) => (
                  <option
                    key={city.city_id}
                    value={`${city.city_id}`}
                    selected={location.city_id === `${city.city_id}`}
                  >
                    {city.city_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex space-x-10 items-center">
            <div className="w-36">
              <InputLabel required className="text-xl" label="Area" />
            </div>
            <div className="w-80">
              <select
                onChange={(e) => handleAreaChange(e.target.value)}
                className="w-full h-10 outline-none border border-black rounded cursor-pointer select-none"
              >
                <option value="">select a area</option>
                {areaList.map((area: Area) => (
                  <option
                    key={area.area_id}
                    value={`${area.area_id}`}
                    selected={location.area_id === `${area.area_id}`}
                  >
                    {area.area_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex space-x-10 items-center">
            <div className="w-36">
              <InputLabel className="text-xl" label="Address Line 1" />
            </div>
            <div className="w-80">
              <TextInput
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
              />
            </div>
          </div>
          <div className="flex space-x-10 items-center">
            <div className="w-36">
              <InputLabel className="text-xl" label="Address Line 2" />
            </div>
            <div className="w-80">
              <TextInput
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full flex justify-end">
            <div className="w-36">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

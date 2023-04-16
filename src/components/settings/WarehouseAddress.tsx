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
  const [location, setLocation] = useState<{
    state_id: string;
    city_id: string;
    area_id: string;
  }>({
    state_id: '',
    city_id: '',
    area_id: '',
  });

  function handleStateChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const state_id = e.target.value;

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

  function handleCityChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const city_id = e.target.value;

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

  function handleAreaChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setLocation({
      ...location,
      area_id: e.target.value,
    });
  }

  useEffect(() => {
    getAllLocation().then((res) => setStateList(res));
  }, []);

  return (
    <section>
      <form className="flex flex-col space-y-5">
        <div className="flex space-x-10 items-center">
          <div className="w-36">
            <InputLabel required className="text-xl" label="State" />
          </div>
          <div className="w-80">
            <select
              onChange={handleStateChange}
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
              onChange={handleCityChange}
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
              onChange={handleAreaChange}
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
            <TextInput />
          </div>
        </div>
        <div className="flex space-x-10 items-center">
          <div className="w-36">
            <InputLabel className="text-xl" label="Address Line 2" />
          </div>
          <div className="w-80">
            <TextInput />
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div className="w-36">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </section>
  );
}

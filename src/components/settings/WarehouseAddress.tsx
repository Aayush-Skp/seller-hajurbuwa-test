import React, { useEffect, useState } from 'react';
import Button from '../common/Button';
import InputLabel from '../common/InputLabel';
import TextInput from '../common/TextInput';
import { getAllLocation } from '../../services/getLocations';
import { addWarehouseInfo } from '../../services/profileService';
import { useRouter } from 'next/router';
import ErrorMessage from '../common/ErrorMessage';

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
  const [isLoading, setIsLoading] = useState(false);
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [stateList, setStateList] = useState<State[]>([]);
  const [cityList, setCityList] = useState<City[]>([]);
  const [areaList, setAreaList] = useState<Area[]>([]);

  const [stateValidation, setStateValidation] = useState({
    isValid: true,
    message: '',
  });

  const [cityValidation, setCityValidation] = useState({
    isValid: true,
    message: '',
  });

  const [areaValidation, setAreaValidation] = useState({
    isValid: true,
    message: '',
  });

  const [addressLine1Validation, setAddressLine1Validation] = useState({
    isValid: true,
    message: '',
  });

  const [addressLine2Validation, setAddressLine2Validation] = useState({
    isValid: true,
    message: '',
  });

  const [locationDetails, setLocationDetails] = useState({
    state: '',
    city: '',
    area: '',
    addressLine1: '',
    addressLine2: '',
  });

  const [location, setLocation] = useState<{
    state_id: string;
    stateName: string;
    cityName: string;
    areaName: string;
    city_id: string;
    area_id: string;
  }>({
    state_id: '',
    stateName: '',
    city_id: '',
    cityName: '',
    area_id: '',
    areaName: '',
  });

  const router = useRouter();

  function handleStateChange(value: string) {
    const stateValue = value.split(',');
    for (const state of stateList) {
      if (`${state.state_id}` === stateValue[0]) {
        setCityList(state?.city ?? []);
      }
    }

    setStateValidation({
      isValid: true,
      message: '',
    });

    setLocation({
      state_id: stateValue[0],
      stateName: stateValue[1],
      city_id: '',
      cityName: '',
      areaName: '',
      area_id: '',
    });
    setAreaList([]);
  }

  function handleCityChange(value: string) {
    const cityValue = value.split(',');

    for (const city of cityList) {
      if (`${city.city_id}` === cityValue[0]) {
        setAreaList(city?.area ?? []);
      }
    }

    setCityValidation({
      isValid: true,
      message: '',
    });

    setLocation({
      ...location,
      city_id: cityValue[0],
      cityName: cityValue[1],
      area_id: '',
      areaName: '',
    });
  }

  function handleAreaChange(value: string) {
    const areaValue = value.split(',');

    setAreaValidation({
      isValid: true,
      message: '',
    });

    setLocation({
      ...location,
      area_id: areaValue[0],
      areaName: areaValue[1],
    });
  }

  function submitLocationData() {
    if (location.state_id === '') {
      setStateValidation({
        isValid: false,
        message: 'Please select state',
      });

      return;
    }

    if (location.city_id === '') {
      setCityValidation({
        isValid: false,
        message: 'Please select city',
      });

      return;
    }

    if (location.area_id === '') {
      setAreaValidation({
        isValid: false,
        message: 'Please select area',
      });

      return;
    }

    if (addressLine1 === '') {
      setAddressLine1Validation({
        isValid: false,
        message: 'Please select address line 2',
      });

      return;
    }

    if (addressLine1 === '') {
      setAddressLine2Validation({
        isValid: false,
        message: 'Please select address line 1',
      });

      return;
    }

    setIsLoading(true);

    addWarehouseInfo({
      ...location,
      addressLine1,
      addressLine2,
    })
      .then((res) => {
        const value = localStorage.getItem('userDetails');

        if (typeof value === 'string') {
          let updatedValue = JSON.parse(value);
          localStorage.setItem(
            'userDetails',
            JSON.stringify({
              ...updatedValue,
              state: location.stateName,
              city: location.cityName,
              area: location.areaName,
              addressLine1,
              addressLine2,
            })
          );
        }

        console.log(res);
      })
      .then(() => {
        router.reload();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
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
        <div className="flex space-x-10 items-center">
          <span className="w-36">Address Line1</span>
          <span className="w-80 border border-black h-10 px-5 flex items-center">
            {locationDetails.addressLine1}
          </span>
        </div>
        <div className="flex space-x-10 items-center">
          <span className="w-36">Address Line2</span>
          <span className="w-80 border border-black h-10 px-5 flex items-center">
            {locationDetails.addressLine2}
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
                    value={`${state.state_id},${state.state_name}`}
                  >
                    {state.state_name}
                  </option>
                ))}
              </select>
              <ErrorMessage message={stateValidation.message} />
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
                    value={`${city.city_id},${city.city_name}`}
                  >
                    {city.city_name}
                  </option>
                ))}
              </select>
            </div>
            <ErrorMessage message={cityValidation.message} />
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
                    value={`${area.area_id},${area.area_name}`}
                  >
                    {area.area_name}
                  </option>
                ))}
              </select>
              <ErrorMessage message={areaValidation.message} />
            </div>
          </div>
          <div className="flex space-x-10 items-center">
            <div className="w-36">
              <InputLabel required className="text-xl" label="Address Line 1" />
            </div>
            <div className="w-80">
              <TextInput
                value={addressLine1}
                onChange={(e) => {
                  setAddressLine1Validation({
                    isValid: true,
                    message: '',
                  });
                  setAddressLine1(e.target.value);
                }}
              />
              <ErrorMessage message={addressLine1Validation.message} />
            </div>
          </div>
          <div className="flex space-x-10 items-center">
            <div className="w-36">
              <InputLabel required className="text-xl" label="Address Line 2" />
            </div>
            <div className="w-80">
              <TextInput
                value={addressLine2}
                onChange={(e) => {
                  setAddressLine2Validation({
                    isValid: true,
                    message: '',
                  });
                  setAddressLine2(e.target.value);
                }}
              />
              <ErrorMessage message={addressLine2Validation.message} />
            </div>
          </div>
          <div className="w-full flex justify-end">
            <div className="w-36">
              <Button type="button" onClick={submitLocationData}>
                {isLoading ? 'Updating...' : 'Submit'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

import React from 'react';
import Select from 'react-select';
import { countries } from '../data/countries';

interface CountryOption {
  value: string;
  label: React.ReactNode;
}

const countryOptions: CountryOption[] = countries.map(country => ({
  value: country.code,
  label: (
    <div className="flex items-center">
      <span className="mr-2">{country.flag}</span>
      <span>{country.name}</span>
    </div>
  )
}));

interface CountrySelectorProps {
  onChange: (value: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ onChange }) => {
  return (
    <Select
      options={countryOptions}
      onChange={(option) => onChange(option?.value || '')}
      placeholder={
        <div className="flex items-center">
          <span className="mr-2">🌎</span>
          <span>Select your country</span>
        </div>
      }
      className="country-select"
      classNamePrefix="country-select"
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: 'rgba(19, 22, 28, 0.6)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          '&:hover': {
            borderColor: 'rgba(223, 255, 136, 0.5)'
          }
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: 'rgb(26, 29, 35)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 100
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? 'rgba(223, 255, 136, 0.1)' : 'transparent',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(223, 255, 136, 0.1)'
          }
        }),
        singleValue: (base) => ({
          ...base,
          color: 'white'
        }),
        input: (base) => ({
          ...base,
          color: 'white'
        }),
        dropdownIndicator: (base) => ({
          ...base,
          color: 'rgba(255, 255, 255, 0.3)',
          '&:hover': {
            color: 'rgba(223, 255, 136, 0.5)'
          }
        }),
        menuList: (base) => ({
          ...base,
          maxHeight: '200px'
        })
      }}
    />
  );
};

export default CountrySelector; 
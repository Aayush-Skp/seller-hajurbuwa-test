import React, { useState, useEffect } from 'react';

const TextInputWithDropdownAndSearch = React.memo(
  function TextInputWithDropdownAndSearch({data, handleBrandSelect, className}: any) {
  // State to manage input value
  const [inputValue, setInputValue] = useState<any>(null)

  // State to manage dropdown options
  const [allOptions, setAllOptions] = useState([])

  // State to manage filtered options based on input
  const [filteredOptions, setFilteredOptions] = useState(allOptions)

  // State to manage selected option
  const [selectedOption, setSelectedOption] = useState(null)

  useEffect(() => {
    if (data) {
      setAllOptions(data)
    }
  },[data])

  // Handle input change
  const handleInputChange = (e: any) => {

    const value = e.target.value;
    setInputValue(value);

    handleBrandSelect(null)
    // Filter options based on input
    const filtered = allOptions.filter((option: any) =>
      option.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);

    if (!e.target.value) {
      // setFilteredOptions([])
    }
  };

  // Handle option selection
  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    setInputValue(option);
    handleBrandSelect(option.id)
    setFilteredOptions([])
  };

  // // Reset filtered options when allOptions changes
  // useEffect(() => {
  //   setFilteredOptions(allOptions);
  // }, [allOptions]);

  return (
    <div>
      {/* Input field */}
      <input
        type="text"
        value={inputValue?.name}
        onFocus={handleInputChange}
        onChange={handleInputChange}
        placeholder="Search or select an option..."
        className={`w-full h-10 px-3 border-[1px] ${
          false ? 'border-error-primary text-error-primary' : 'border-gray-600'
        } outline-none rounded focus:shadow-[1px_-1px_8px_rgba(0,0,0,0.30)] transition-shadow duration-300 ${className}`}
      />

      {/* Dropdown with filtered options */}
      <div>
        {filteredOptions.map((option:any, index) => (
          <div
            key={index}
            onClick={() => handleOptionSelect(option)}
            style={{ cursor: 'pointer' }}
          >
            {option.name}
          </div>
        ))}
      </div>

      {/* Display selected option */}
      {/* {selectedOption && <p>Selected: {selectedOption}</p>} */}
    </div>
  );
})

export default TextInputWithDropdownAndSearch;
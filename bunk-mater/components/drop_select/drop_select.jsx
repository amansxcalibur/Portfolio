'use client'

import Select from "react-select";
import { useState } from "react";

export default function Drop({tableData, handleUpdate, row, col}){
    const optionList = [
        { value: "maths", label: "Maths" },
        { value: "phy", label: "Physics" },
        { value: "comp", label: "Computer" },
        { value: "chem", label: "Chemistry" },
        { value: "eng", label: "English" }
      ];
      const [selectedOptions, setSelectedOptions] = useState();
      
      function handleSelect(data){
        setSelectedOptions(data);
        console.log(data.label, row, col);
        handleUpdate({data, row, col});
      }

      return (
        <div className="">
          <div className="dropdown-container">
            <Select 
              options={optionList}
              placeholder={tableData[row][col]}
              value={selectedOptions}
              onChange={handleSelect}
              isSearchable={true}
              styles={{
                control: (baseStyles, state)=>({
                  ...baseStyles,
                  borderColor: state.isFocused?"white":"transparent",
                  height:"12vw",
                  backgroundColor:tableData[row][col]==null?"":"#202224",
                  color:""
                }),
                menu: (baseStyles, state)=>({
                  ...baseStyles,
                  backgroundColor:"black",
                }),
                option: (baseStyles, { isFocused, isSelected }) => ({
                  ...baseStyles,
                    backgroundColor: isSelected ? "green" : isFocused ? "#00AA4A" : undefined
                }),
                placeholder: (baseStyles, state)=>({
                  ...baseStyles,
                  color:"white"
                }),
                singleValue: (baseStyles, state)=>({
                  ...baseStyles,
                  color:"#99FF9B"
                })
              }}
            />
          </div>
        </div>
      );
}
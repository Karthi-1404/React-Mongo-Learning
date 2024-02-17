
import React from "react";

const categories = [
    { name: "mobile", value: "mobile" },
    { name: "electronics", value: "electronics" },
    { name: "home", value: "home" },
    { name: "fashion", value: "fashion" },
    { name: "books", value: "books" },
];

export default function Filter({ setShowfilters, showfilters,filter,setFilter }) {
  console.log('filter',filter)
  return (
    <div className="w-72 flex flex-col">
      <div className="flex justify-between">
        {!showfilters && <i class="ri-equalizer-line"></i>}
        <h2 className="text-orange-455 text-xl">Filters</h2>
        <i
          class="ri-close-line cursor-pointer text-xl"
          onClick={() => {
            setShowfilters(!showfilters);
          }}
        ></i>
      </div>
      <div col="flex flex-col gap-1 mt-5">
        <h2>Categories</h2>
        <div col="flex flex-col gap-1">
        {categories.map((category=>{return(
        <div className="flex gap-2 items-center">
        <input type='Checkbox' 
        className="max-width"
        checked={filter.category.includes(category.value)}
         onChange={(e)=>{
             if(e.target.checked)  {
              setFilter({
               ...filter,
               category:[...filter.category,category.value]
              })
             }else{
              setFilter({
                ...filter,
                category:filter.category.filter((item)=>item !== category.value)
              })
             }
        }} value={category.value} name={category.name}></input>
        <label htmlFor="category">{category.name}</label>
        </div>)}))}
       </div>
      </div>
    </div>
  );
}

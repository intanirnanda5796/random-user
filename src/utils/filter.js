import { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { Icon } from "@iconify/react";
import { Input } from "../components";

const GlobalFilter = ({
  globalFilter,
  setGlobalFilter
}) => {
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
      }, 200);


    const handleChange = (e) => {
      setValue(e.target.value);
      onChange(e.target.value);
    }

    return (
      <>
        <div className="flex flex-col">
          <small className="font-poppins pb-1 font-medium text-sm">Search</small>
          <div className="relative w-96">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <Icon icon="akar-icons:search" className="text-gray-400"/>
            </div>
            <Input
              placeholder="Search"
              value={value || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        
      </>
        
        
    )
};

export default GlobalFilter;

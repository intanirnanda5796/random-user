import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTable, usePagination, useGlobalFilter, useSortBy } from "react-table";
import moment from "moment";
import GlobalFilter from "../../utils/filter";
import { Icon } from '@iconify/react';
import PageLoadError from "../pageloaderror";

export default function Homepage() {
  const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [selectItems, setSelectItems] = useState("");
  const [error, setError] = useState(false);

  const columns = React.useMemo(
    () => [
      {
        Header: "Username",
        accessor: (data) => data.login.username,
      },
      {
        Header: "Name",
        accessor: (data) => `${data.name.first} ${data.name.last}`,
      },
      {
        Header: "Email",
        accessor: (data) => data.email,
      },
      {
        Header: "Gender",
        accessor: (data) => data.gender,
      },
      {
        Header: "Registered Date",
        accessor: (data) =>
          moment().utc(data.registered.date).format("YYYY-MM-DD HH:mm"),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setGlobalFilter,
    preGlobalFilteredRows,
    state: { globalFilter },
  } = useTable(
    { columns, data, manualPagination: true, pageCount: 3 },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const handlePreviousePage = () => {
    previousPage();
    setPageIndex(pageIndex - 1);
  };

  const handleNextPage = () => {
    nextPage();
    setPageIndex(pageIndex + 1);
  };

  useEffect(() => {
    let url = `https://randomuser.me/api/?page=${
      pageIndex + 1
    }&pageSize=10&results=10`;

    const fetchData = async () => {
     try {
      if (selectItems !== "") url = url.concat(`&gender=${selectItems}`);
  
        const result = await axios.get(url);
        setData(result.data.results);
     } catch (e) {
      setError(true);
     }
    }

    fetchData();
  }, [pageIndex, selectItems]);

  if (error) return <PageLoadError />

  const handleResetFilter = () => {
    setGlobalFilter("");
    setSelectItems("");
  }

  return (
    <>
      <div className="pt-10 pb-5 flex flex-col md:justify-center place-items-center">
          <div className="flex flex-col md:flex-row place-items-center md:space-x-5">
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />

              <div className="flex flex-col pt-5 md:pt-0">
                <small className="font-poppins pb-1 font-medium text-sm">Gender</small>
                <div className="flex flex-row place-items-center space-x-3">
                  <select
                    className="w-60 py-2 px-2 rounded-sm bg-gray-50 font-poppins"
                    value={selectItems}
                    onChange={(e) => setSelectItems(e.target.value)}>
                    <option value="">All</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                  <button className="px-8 text-sm text-white py-3 bg-blue-800 font-poppins rounded-sm" onClick={() => handleResetFilter()}>Reset Filter</button>
                </div>
              </div>
          </div>

          <div className="pt-10 relative sm:rounded-lg">
            <table className="md:w-full text-sm text-left text-gray-500 dark:text-gray-400" {...getTableProps()}>
              <thead className="px-6 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                {headerGroups.map((headerGroup) => {
                  const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
                  return (
                    <tr key={key} {...restHeaderGroupProps}>
                      {headerGroup.headers.map((column) => {
                        const { key, ...restColumn } = column.getHeaderProps(column.getSortByToggleProps());
                        return (
                          <th key={key} {...restColumn} className="md:py-3 md:px-10 text-left font-poppins text-xs md:text-sm mr-5">
                            {column.render("Header")}
                            <span className="float-right mt-1 mr-1 md:ml-5 md:mr-0">
                              {column.isSorted
                                ? column.isSortedDesc
                                ? <Icon icon="akar-icons:arrow-down" />
                                : <Icon icon="akar-icons:arrow-up" />
                              : <Icon icon="fluent:filter-12-regular" />}
                            </span>
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  const { key, ...restRowProps } = row.getRowProps();
                  return (
                    <tr key={key} {...restRowProps} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                      {row.cells.map((cell) => {
                        const { key, restCellProps } = cell.getCellProps();
                        return (
                          <td key={key} {...restCellProps} className="py-4 px-10 text-left font-poppins text-xs md:text-sm">
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="pt-5 right-0">
            <div className="flex flex-row place-items-center pagination space-x-2">
              <button
                className="border border-gray-200 rounded-sm px-2 py-2"
                onClick={() => handlePreviousePage()}
                disabled={!canPreviousPage}>
                <Icon icon="ant-design:arrow-left-outlined"/>
              </button>{" "}
              <strong className="border border-gray-200 rounded-sm px-3 py-1 text-md font-semibold font-poppins">
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
              <button 
                className="border border-gray-200 rounded-sm px-2 py-2"
                onClick={() => handleNextPage()} 
                disabled={!canNextPage}>
                <Icon icon="ant-design:arrow-right-outlined" />
              </button>{" "}
            </div>
          </div>
          
      </div>      
    </>
  );
}

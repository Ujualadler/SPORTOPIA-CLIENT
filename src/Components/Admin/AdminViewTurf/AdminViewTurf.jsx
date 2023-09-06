import React from "react";
import { Toaster, toast } from "react-hot-toast";
import Adminaxios from "../../../Axios/adminAxios";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function AdminViewTurf() {
  const adminAxios=Adminaxios()
  const token = useSelector((store) => store.Admin.Token);
  const [turfData, setTurfData] = useState([]);
  const [SearchInput, setSearchInput] = useState("");

  useEffect(() => {
    adminAxios.get("/turflist")
      .then((response) => {
        console.log(response.data);
        setTurfData(response.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const blockTurf = async (id) => {
    try {
      console.log(id);
      const response = await adminAxios.get(`/blockTurf?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        title:"Are you sure?",
        text:turfData[0].isTurfBlocked===true?"Do you want to unblock this Turf!":"Do you want to block this Turf!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText:turfData[0].isTurfBlocked===true?"Yes, Unblock it !":"Yes,block it !",
    }).then((result) => {
        if (result.isConfirmed) {
          if(response.data.result[0].isTurfBlocked===true){
            Swal.fire("BLOCKED!", "Turf blocked.", "success");
          }else{
            Swal.fire("UNBLOCKED!", "Turf Unblocked.", "success");
          }
            setTurfData(response.data.result);
        }
    });
    
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-screen flex-col ml-3 mr-3">
        <Toaster />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-12">
          <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900 mr-2">
            <div className="text-white ml-3 font-bold text-lg tracking-wide ">
              TURF LIST
            </div>
            <form role="search">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search-users"
                  value={SearchInput}
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for users"
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
            </form>
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="pl-9">
                  No
                </th>
                <th scope="col" className="pl-9">
                  IMAGE
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {turfData
                .filter((turf) =>
                  turf.turfName.toLowerCase().includes(SearchInput.toLowerCase())
                )
                .map((obj, index) => {
                  return (
                    <tr
                      key={obj._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th key={obj._id} className="pl-9">
                        {index + 1}
                      </th>
                      <td className="px-6 py-4 "><img className="w-16" src={obj.logo} alt="" /></td>
                      <td className="px-6 py-4">{obj.turfName}</td>
                      <td className="px-6 py-4">{obj.turfType}</td>    
                      <td className="px-6 py-4">{obj.phone}</td>
                      <td className="px-6 py-4">
                        {obj.isTurfBlocked ? (
                          <button
                            onClick={() => blockTurf(obj._id)}
                            key={obj._id}
                            className=" bg-green-900 w-15 text-white font-mono rounded-md w-[4rem]"
                          >
                            UNBLOCK
                          </button>
                        ) : (
                          <button
                            key={obj._id}
                            onClick={() => blockTurf(obj._id)}
                            className=" bg-red-800 w-15 text-white font-mono rounded-md w-[4rem]"
                          >
                            BLOCK
                          </button>
                        )}
                        ̥
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminViewTurf;

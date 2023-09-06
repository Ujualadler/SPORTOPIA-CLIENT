import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TurfAxios from "../../../Axios/turfAxios";
import {toast} from 'react-toastify';

const TurfEditProfile = () => {

  const turfAxios=TurfAxios()

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [age, setAge] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const img = useRef(null);

  useEffect(() => {
    turfAxios
      .get("/getAdminDetail")
      .then((response) => {
        const userdata = response.data.data;
        setName(userdata.name);
        setContactNumber(userdata.contactNumber);
        setAge(userdata.age);
        setCity(userdata.city)
        setPin(userdata.pin);
        setImage(userdata.image);
        setPreview(userdata.image);
      });
  }, []);
  
  const successToast = (msg) => {
    toast.success(msg);
  };
         
  const errorToast = (msg) => {
    toast.error(msg);
  };

  const uploadImage = (e) => {
    const selectedImage = e.target.files[0];
  
    if (selectedImage) {
      const allowedTypes = ['image/jpeg','image/webp','image/png', 'image/gif','image/jpg'];
      if (!allowedTypes.includes(selectedImage.type)) {
        errorToast('Please select a valid image (JPEG, PNG, or GIF).');
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    } else{
      setPreview(null);
    }
  };
  
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    turfAxios.post(
      "/turfEditProfile",
      { name, contactNumber, image: preview, city, pin, state, street, age },
    ).then((res)=>{
        if (res.data.status === "success"){
            successToast('Updated Successfully')
            navigate('/turf/profile')
        }else{
            errorToast('Something went wrong')
        }
    }).catch((err)=>{
        console.log(err)
        navigate('/turf/error')
    })
  };

  return (
    <form className="h-full" onSubmit={handleUpdateProfile}>
      <div className="border-b-2 block md:flex md:ml-12 md:mr-12">
        <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 m-7 ml-1.5 border border-gray-700 bg-gray-900 bg-opacity-60 shadow-2xl">
          <div className="flex justify-between">
            <span className="text-xl text-white font-semibold block">
              EDIT YOUR PROFILE
            </span>
          </div>
          <div className="w-full p-8 mx-2 flex justify-center">
            <div className="flex-col">
              <img
                id="showImage"
                src={preview ? preview :image?image:'https://as1.ftcdn.net/v2/jpg/02/09/95/42/1000_F_209954204_mHCvAQBIXP7C2zRl5Fbs6MEWOEkaX3cA.jpg'}
                className="max-w-xs md:w-48 md:h-48  h-32 w-32 border border-black rounded-full items-center"
                alt=""
              />
              <div className="mt-5 text-center">
                <button
                  type="button"
                  onClick={() => {
                    img.current.click();
                  }}
                  className="rounded hover:rounded-lg bg-black w-[8.5rem] h-[2rem] hover:bg-slate-900 text-white"
                >
                  ADD PROFILE PIC
                </button>
                <input
                  className="hidden"
                  ref={img}
                  accept="image/gif,image/webp,image/png,image/jpg,image/jpeg"
                  onChange={uploadImage}
                  type="file"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/5 p-8 border m-7 ml-1 border-gray-700 bg-gray-900 bg-opacity-60 lg:ml-4 shadow-2xl">
          <div className="rounded shadow p-6">
            <div className="pb-6">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                Name
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-400 rounded-r px-4 py-2 w-full"
                  type="text"
                  value={name ? name : ""}
                  placeholder="Enter name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pb-6">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                Contact Number
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-400 rounded-r px-4 py-2 w-full"
                  type="number"
                  value={contactNumber ? contactNumber : ""}
                  placeholder="Enter contact number"
                  onChange={(e) => {
                    setContactNumber(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pb-6">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                Age
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-400 rounded-r px-4 py-2 w-full"
                  type="number"
                  value={age ? age : ""}
                  placeholder="Enter age"
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pb-6">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                City
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-400 rounded-r px-4 py-2 w-full"
                  type="text"
                  value={city ? city : ""}
                  placeholder="Enter city name"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pb-6">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                PIN(ZIP code)
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-400 rounded-r px-4 py-2 w-full"
                  type="number"
                  placeholder="Enter PIN code"
                  value={pin ? pin : ""}
                  onChange={(e) => {
                    setPin(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mt-5 text-center">
              <button
                type="submit"
                className="rounded hover:rounded-lg bg-black w-[8.5rem] h-[2rem] hover:bg-slate-900 text-white"
              >
                UPDATE DETAILS
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TurfEditProfile;

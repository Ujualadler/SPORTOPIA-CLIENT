import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserAxios from "../../../Axios/userAxios";
import { toast } from 'react-toastify';

const ClubCreation = () => {
  const [clubName, setClubName] = useState("");
  const [clubType, setClubType] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState("");
  const [backgroundImage, setBackground] = useState("");

  const userAxios = UserAxios();

  const img = useRef(null);
  const bg = useRef(null);

  const { id } = useParams();

  const successToast = (msg) => {
    toast.success(msg);
  };

  const errorToast = (msg) => {
    toast.error(msg);
  };

  const uploadLogo = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const allowedTypes = [
        "image/jpeg",
        "image/webp",
        "image/png",
        "image/gif",
        "image/jpg",
      ];
      if (!allowedTypes.includes(selectedImage.type)) {
        errorToast("Please select a valid image (JPEG, PNG, or GIF).");
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
    } else {
      setPreview(null);
    }
  };
  const uploadBackground = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const allowedTypes = [
        "image/jpeg",
        "image/webp",
        "image/png",
        "image/gif",
        "image/jpg",
      ];
      if (!allowedTypes.includes(selectedImage.type)) {
        errorToast("Please select a valid image (JPEG, PNG, or GIF).");
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onload = () => {
        setBackground(reader.result);
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    } else {
      setBackground(null);
    }
  };

 

  const createClub = async (e) => {
    e.preventDefault();

    const generateError = (err) =>
    toast.error(err);

  if (
    !clubName.trim() ||
    !clubType.trim() ||
    !description.trim()
  ) {
    generateError("Please fill in all the fields");
    return;
  }

  if (!preview || !backgroundImage) {
    generateError("Please select both logo and background image");
    return;
  }

    userAxios
      .post(`/createClub`, {
        clubName,
        logo: preview,
        clubType,
        description,
        backgroundImage,
      })
      .then((res) => {
        if (res.data.status === "success") {
          successToast("Club Successfully Created");
        } else {
          errorToast(res.data.status);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate('/error')
      });
  };

  return (
    <form className="h-full" onSubmit={createClub}>
      <div className=" block md:flex md:ml-12 md:mr-12 ">
        <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 m-7 ml-1.5 border border-gray-700 bg-gray-900 bg-opacity-60 shadow-2xl">
          <div className="flex justify-between">
            <span className="text-xl font-semibold font-heading text-white uppercase md:tracking-widest block">CREATE A CLUB</span>
          </div>
          <div className="w-full p-8 mx-2 flex justify-center">
            <div className="flex-col">
              <img
                id="showImage"
                src={preview ? preview : "https://i.pinimg.com/736x/d9/02/20/d90220aa02234c89c188c451437d0bca.jpg"}
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
                  ADD LOGO
                </button>
                <input
                  className="hidden"
                  ref={img}
                  accept="image/gif,image/webp,image/png,image/jpeg,image/jpg,"
                  onChange={uploadLogo}
                  type="file"
                />
              </div>
            </div>
          </div>
          <div className="w-full p-8 mx-2 flex  justify-center">
            <div className="flex-col">
              <img
                id="showImage"
                src={
                  backgroundImage
                    ? backgroundImage
                    : "https://i.pinimg.com/736x/d9/02/20/d90220aa02234c89c188c451437d0bca.jpg"
                }
                className="max-w-xs md:w-96 md:h-48  h-32 w-64 border border-black rounded-sm items-center"
                alt=""
              />
              <div className="mt-5 text-center">
                <button
                  type="button"
                  onClick={() => {
                    bg.current.click();
                  }}
                  className="rounded hover:rounded-lg bg-black w-[16rem] h-[2rem] hover:bg-slate-900 text-white"
                >
                  BACKGROUND IMAGE
                </button>
                <input
                  className="hidden"
                  ref={bg}
                  // accept="image/gif,image/webp"
                  onChange={uploadBackground}
                  type="file"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/5 p-8 border m-7 ml-1 border-gray-700 bg-gray-900 bg-opacity-60 lg:ml-4 shadow-2xl">
          <div className="rounded shadow p-6">
            <div className="pb-2">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                Name
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-400  rounded-r px-4 py-2 w-full"
                  type="text"
                  placeholder="Enter club name"
                  onChange={(e) => {
                    setClubName(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pb-2">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                Type
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-400 rounded-r px-4 py-2 w-full"
                  type="text"
                  placeholder="Enter club type"
                  onChange={(e) => {
                    setClubType(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="pb-2">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                Description
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-400 rounded-r px-4 py-2 w-full pb-48 break-word"
                  type="text"
                  placeholder="Enter description of the club"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mt-5 text-center">
              <button
                type="submit"
                className="rounded hover:rounded-lg bg-black w-[8.5rem] h-[2rem] hover:bg-slate-900 text-white"
              >
                CREATE
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ClubCreation;

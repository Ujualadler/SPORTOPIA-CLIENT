import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TurfAxios from "../../../Axios/turfAxios";
import toast, { Toaster } from "react-hot-toast";

const TurfEdit = () => {
  const [turfName, setTurfName] = useState("");
  const [phone, setPhone] = useState("");
  const [turfType, setTurfType] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [logo, setLogo] = useState("");
  const [preview, setPreview] = useState("");
  const [photos, setPhotos] = useState([]);
  const [opening, setOpening] = useState("");
  const [closing, setClosing] = useState("");
  const [advance, setAdvance] = useState("");
  const [total, setTotal] = useState("");

  const turfAxios=TurfAxios()

  const img = useRef(null);

  const { id } = useParams();

  useEffect(() => {
    turfAxios
      .get(`/getTurfDetail?id=${id}`)
      .then((response) => {
        const turfdata = response.data.data;
        setTurfName(turfdata.turfName);
        setPhone(turfdata.phone);
        setTurfType(turfdata.turfType);
        setLogo(turfdata.logo);
        setAdvance(turfdata.advance);
        setPhotos(turfdata.photos);
        setPin(turfdata.pin);
        setClosing(turfdata.closing);
        setPreview(turfdata.logo);
        setTotal(turfdata.total);
        setCity(turfdata.city);
        setStreet(turfdata.street);
        setState(turfdata.state);
        setOpening(turfdata.opening);
      });
  }, []);

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

  const isValidImage = (fileName) => {
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const fileExtension = fileName.split(".").pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
  };

  const fileInputRefs = useRef(Array(photos.length).fill(null)).current;
  const [photoPreviews, setPhotoPreviews] = useState(
    Array(photos.length).fill(null)
  );

  const uploadPhoto = (event, index) => {
    const file = event.target.files[0];
    if (isValidImage(file.name)) {
      const reader = new FileReader();
      reader.onload = () => {
        const newPreviews = [...photoPreviews];
        newPreviews[index] = reader.result;
        photos[index]=reader.result
        setPhotoPreviews(newPreviews);
      };
      reader.onerror = (error) => {
        console.log(error);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Add valid images (jpg, jpeg, png, gif).");
    }
  };

  const handleUpdateTurf = async (e) => {
    e.preventDefault();

    const generateError = (err) =>
    toast.error(err, { position: "bottom-center" });


    if (
      !turfName.trim() ||
      !turfType.trim() ||
      !opening.trim() ||
      !closing.trim() ||
      !advance.toString().trim() ||
      !total.toString().trim() ||
      !street.trim() ||
      !city.trim() ||
      !state.trim() ||
      !pin.toString().trim()
    ) {
      generateError("Please fill in all the fields");
      return;
    }

    if (opening >= closing) {
      generateError("Opening time should be less than closing time");
      return;
    }

    if (advance <= 0 || total <= 0) {
      generateError("Enter a valid amount");
      return;
    }

    if (phone.length < 10) {
      generateError("Enter valid phone number");
      return;
    }

    turfAxios
      .post(
        `/turfEdit?id=${id}`,
        {
          turfName,
          phone,
          logo: preview,
          city,
          pin,
          state,
          street,
          opening,
          closing,
          advance,
          total,
          turfType,
          photos
        })
      .then((res) => {
        if (res.data.status === "success") {
          successToast("Updated Successfully");
        } else {
          errorToast("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate('/turf/error')
      });
  };

  return (
    <form className="h-full" onSubmit={handleUpdateTurf}>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            fontSize: "25px",
            fontFamily: "sans-serif",
            border: "1px solid black",
            width: "700px",
            height: "100px",
          },
        }}
      />
      <div className="border-b-2 block md:flex md:ml-12 md:mr-12">
        <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 border border-gray-700 bg-gray-900 bg-opacity-60 shadow-2xl">
          <div className="flex justify-between">
            <span className="text-xl text-white font-semibold block">
              EDIT TURF DETAILS
            </span>
          </div>
          <div className="w-full p-8 mx-2 flex justify-center">
            <div className="flex-col">
              <img
                id="showImage"
                src={preview ? preview : logo}
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
                  accept="image/gif,image/webp,image/png,image/jpeg,image/jpg"
                  onChange={uploadLogo}
                  type="file"
                />
              </div>
            </div>
          </div>
          <h3 className="w-full font-semibold m-2 text-white">TURF IMAGES</h3>
          <div className=" flex-wrap col grid grid-cols-2 bg-gray-950  shadow-2xl">
            {photos.map((pic, index) => (
              <div key={index}  className="m-2 col-span-1 md:ml-3 ">
                <input
                  ref={(el) => (fileInputRefs[index] = el)}
                  type="file"
                  onChange={(e) => uploadPhoto(e, index)}
                  className="hidden"
                />
                <img
                  onClick={() => {
                    fileInputRefs[index].click();
                  }}
                  className="hover:bg-opacity-75 transition-all duration-300 h-32 md:h-36 rounded-md"
                  src={photoPreviews[index] || pic}
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-3/5 p-8 border ml-1 border-gray-700 bg-gray-900 bg-opacity-60 lg:ml-4 shadow-2xl">
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
                  className="border border-gray-700 rounded-r px-4 py-2 w-full"
                  type="text"
                  value={turfName?turfName : ""}
                  placeholder="Enter turf name"
                  onChange={(e) => {
                    setTurfName(e.target.value);
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
                  className="border border-gray-700 rounded-r px-4 py-2 w-full"
                  type="text"
                  value={turfType ? turfType : ""}
                  placeholder="Enter turf type"
                  onChange={(e) => {
                    setTurfType(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pb-2">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                Phone number
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-700 rounded-r px-4 py-2 w-full"
                  type="number"
                  defaultValue={phone ? phone : ""}
                  placeholder="Enter phone number"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pb-2">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                Opening time
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-700 rounded-r px-4 py-2 w-full"
                  type="time"
                  defaultValue={opening ? opening : ""}
                  placeholder="Enter opening time"
                  onChange={(e) => {
                    setOpening(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pb-2">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                Closing time
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-700 rounded-r px-4 py-2 w-full"
                  type="time"
                  defaultValue={closing ? closing : ""}
                  placeholder="Enter closing time"
                  onChange={(e) => {
                    setClosing(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pb-2">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                Advance Amount
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-700 rounded-r px-4 py-2 w-full"
                  type="number"
                  defaultValue={advance ? advance : ""}
                  placeholder="Enter advance"
                  onChange={(e) => {
                    setAdvance(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pb-2">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                Total Amount
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-700 rounded-r px-4 py-2 w-full"
                  type="number"
                  defaultValue={total ? total : ""}
                  placeholder="Enter age"
                  onChange={(e) => {
                    setAdvance(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pb-2">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                Street
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-700 rounded-r px-4 py-2 w-full"
                  type="text"
                  value={street ? street : ""}
                  placeholder="Enter street name"
                  onChange={(e) => {
                    setStreet(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pb-2">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                City
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-700 rounded-r px-4 py-2 w-full"
                  type="text"
                  value={city ? city : ""}
                  placeholder="Enter city name"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pb-2">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                State
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-700 rounded-r px-4 py-2 w-full"
                  type="text"
                  value={state ? state : ""}
                  placeholder="Enter state name"
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="pb-2">
              <label
                htmlFor="name"
                className="font-semibold text-gray-200 block pb-1"
              >
                PIN(ZIP code)
              </label>
              <div className="flex">
                <input
                  id="username"
                  className="border border-gray-700 rounded-r px-4 py-2 w-full"
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

export default TurfEdit;

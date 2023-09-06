import React, { useEffect, useRef, useState } from "react";
import AdminAxios from "../../../Axios/adminAxios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


function Banner() {
  const adminAxios = AdminAxios();
  const [title, setTitle] = useState(null);
  const [subTitle, setSubTitle] = useState(null);
  const [file, setFile] = useState("");
  const [state, setState] = useState(false);
  const [banner, setBanner] = useState("");
  const img = useRef();

  useEffect(()=>{
    try {
        const getBanner=async()=>{
            const response=await adminAxios.get('/getBanner')
            if(response){
                setBanner(response.data.banner)
            }
        }
        getBanner()
    } catch (error) {
        console.log(error)
    }
    
  },[state])

  const changeimg = (event) => {
    const file = event.target.files[0];
    const allowedExtensions = /\.(jpg|jpeg|png)$/i;
    if (!allowedExtensions.test(file.name)) {
      toast.error("Invalid file format");
      return;
    }
    setFile(file);
  };

  const uploadBanner = async (e) => {
    e.preventDefault();
    if (!title||!subTitle|| !file) {
      toast.error("fill all the fields");
      return;
    }
    
    try {
      const response = await adminAxios.post(
        "/bannerAdd",
        { title,subTitle, file: file},
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data.status === true) {
        toast.success("Saved Successfully");
        setBanner(response.data.banner);
        setFile('')
        setTitle('')
        setSubTitle('')
        setState(true)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeBanner = async (id) => {
    try {
      const response = await adminAxios.post('/removeBanner',{id});
      Swal.fire({
        title:"Are you sure?",
        text:"Do you want to remove this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText:"REMOVE",
    }).then((result) => {
        if (result.isConfirmed==true) {
            Swal.fire("Successfully removed");
            setBanner(response.data.banner)
        }
    });
    
    } catch (error) {
      console.log(error);
    }
  };

//   console.log(gallery+'gallery')

  return (
    <div>
      <div className="flex justify-center md:justify-start m-5 ">
        <h2 className="text-xl font-bold text-gray-200 lg:text-2xl">
          BANNER MANAGEMENT
        </h2>
      </div>
      <form
        onSubmit={uploadBanner}
        className="bg-gray-900 m-2 p-2 bg-opacity-60  grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="mx-auto w-full px-4 md:px-8  col-span-1">
          <div className="col-span-1 md:col-span-1/3">
            {/* image - start */}
            <a
              onChange={changeimg}
              className="group relative flex h-48 items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg md:h-60"
            >
              <img
                src={
                  file instanceof File
                    ? URL.createObjectURL(file)
                    : "https://i.pinimg.com/originals/a0/fd/25/a0fd250f8c472453edb02e06f2b9bb65.png"
                }
                loading="lazy"
                onClick={() => img.current.click()}
                alt="Photo by Minh Pham"
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
              />
              <input type="file" name="file" hidden ref={img} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent opacity-50"></div>

              <span className="relative ml-4 mb-3 inline-block text-sm text-white font-bold md:ml-5 md:text-lg">
                ADD AN IMAGE
              </span>
            </a>
            {/* image - end */}
          </div>
          <div className="mt-2 ">
            <input
              className="w-full h-14 bg-black text-center text-white bg-opacity-70 rounded-md md:w-[99%]"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your title"
            />
          </div>
          <div className="mt-2 ">
            <input
              className="w-full h-14 bg-black text-center text-white bg-opacity-70 rounded-md md:w-[99%]"
              type="text"
              onChange={(e) => setSubTitle(e.target.value)}
              placeholder="Your sub title"
            />
          </div>
          <div className="mt-2 ">
            <button className="w-full h-12 bg-black hover:bg-white text-white hover:text-black font-bold rounded-md md:w-[99%]">
              SAVE
            </button>
          </div>
        </div>
        <div className="col-span-2 gallery overflow-scroll h-[360px]">
        {banner.length
          ? banner.map((data) => (
              <div key={data._id} className="bg-black bg-opacity-60 w-[40rem] md:w-min  h-28 flex justify-between p-2 rounded-xl mb-2">
                <img
                  src={data?.image} // Use the actual image URL from the data
                  loading="lazy"
                  alt="Photo by Minh Pham"
                  className="w-24 h-24"
                />
                <div className="m-5 w-[35rem]  text-ellipsis ">
                <p className="text-white pl-2"><label className="mr-2 text-gray-400" htmlFor="">TITLE:</label>{data?.title}</p>
                <p className="text-white pl-2"><label className="mr-2 text-gray-400" htmlFor="">SUB TITLE:</label>{data?.subTitle}</p>
                </div>
                <button  key={data._id} onClick={()=>removeBanner(data._id)} type="submit" className="w-32 ml-2 bg-black p- text-white hover:bg-gray-900">
                  REMOVE
                </button>
              </div>
            ))
          :(
            <div className="flex justify-center mt-36 h-screen">
              <div className="text-xl font-bold">NO BANNER AVAILABLE </div>
            </div>
          )}
          </div>
      </form>
      </div>
  );
}

export default Banner;

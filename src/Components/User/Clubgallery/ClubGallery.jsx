import React, { useEffect, useRef, useState } from "react";
import UserAxios from "../../../Axios/userAxios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


function ClubGallery() {
  const userAxios = UserAxios();
  const clubId = useSelector((state) => state.Club.clubId);
  const [content, setContent] = useState(null);
  const [file, setFile] = useState("");
  const [state, setState] = useState(false);
  const [gallery, setGallery] = useState("");
  const img = useRef();

  useEffect(()=>{
    try {
        const getGallery=async()=>{
            const response=await userAxios.post('getGallery',{clubId})
            if(response){
                setGallery(response.data.gallery)
            }
        }
        getGallery()
    } catch (error) {
        console.log(error)
        navigate('/error')
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

  const uploadGallery = async (e) => {
    e.preventDefault();
    if (!content || !file) {
      toast.error("Please provide both description and an image file.");
      return;
    }
    
    try {
      const response = await userAxios.post(
        "/clubGalleryAdd",
        { content: content, file: file, clubId: clubId },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data.status === true) {
        toast.success("Saved Successfully");
        console.log(response.data.gallery+'data')
        setGallery(response.data.gallery);
        setFile('')
        setContent(null)
        setState(true)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeGallery = async (id) => {
    try {
      console.log(id);
      const response = await userAxios.post('/removeGallery',{clubId,id});
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
            setGallery(response.data.gallery)
        }
    });
    
    } catch (error) {
      console.log(error);
    }
  };

  console.log(gallery+'gallery')

  return (
    <>
      <div className="flex justify-center md:justify-start m-5 gap-12">
        <h2 className="text-xl font-bold text-gray-200 lg:text-2xl">
          CLUB GALLERY
        </h2>
      </div>
      <form
        onSubmit={uploadGallery}
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
              className="w-full h-14 bg-black text-center bg-opacity-70 rounded-md md:w-[99%]"
              type="text"
              onChange={(e) => setContent(e.target.value)}
              placeholder="Your description"
            />
          </div>
          <div className="mt-2 ">
            <button className="w-full h-12 bg-black hover:bg-white hover:text-black font-bold rounded-md md:w-[99%]">
              SAVE
            </button>
          </div>
        </div>
        <div className="col-span-2 gallery overflow-scroll h-[360px]">
        {gallery.length
          ? gallery.map((data) => (
              <div key={data._id} className="bg-black bg-opacity-60 w-100 h-28 flex justify-between p-2 rounded-xl mb-2">
                <img
                  src={data.image} // Use the actual image URL from the data
                  loading="lazy"
                  alt="Photo by Minh Pham"
                  className="w-24 h-24"
                />
                <p className="text-white pl-2">{data.content}</p>
                <button  key={data._id} onClick={()=>removeGallery(data._id)} type="submit" className="w-32 ml-2 bg-black p-2 hover:bg-gray-900">
                  REMOVE
                </button>
              </div>
            ))
          :(
            <div className="flex justify-center mt-36 h-screen">
              <div className="text-xl font-bold">EMPTY GALLERY</div>
            </div>
          )}
          </div>
      </form>
    </>
  );
}

export default ClubGallery;

import React, { useState } from "react";
import UserAxios from "../../../Axios/userAxios";
import { toast } from "react-toastify"; 
import { useNavigate } from "react-router-dom";

const AddReview = (id) => {
  const userAxios = UserAxios();
  const [menu, setMenu] = useState(true);
  const [menu1, setMenu1] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const turf = id.turf;
  
  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewText.trim() || !rating.toString().trim()) {
      toast.error("Fill all the fields");
      return;
    }
    try {
      let response = await userAxios.post("/addReview", {
        reviewText,
        rating,
        turf,
      });
      if (response) {
        toast.success(response.data.message);
        navigate("/bookingHistory");
      } else {
        toast.error("Failed to submit review");
      }
    } catch (error) {
      navigate('/error')
      console.log(error);
    }
    setReviewText("");
    setRating(0);
  };

  return (
    <div className="py-8 px-4 md:px-3 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center ">
      <div className="flex flex-col w-full space-y-3">
        <div className="flex justify-start items-start flex-col bg-gray-900 bg-opacity-60 p-6 border border-gray-700 shadow-2xl rounded-lg">
          <div className="flex flex-col md:flex-row justify-between w-full">
            <div className="flex flex-row justify-between items-start">
              <button onClick={() => setMenu(!menu)} className="ml-4 md:hidden">
                <svg
                  className={"transform " + (menu ? "rotate-180" : "rotate-0")}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 12.5L10 7.5L5 12.5"
                    stroke="#1F2937"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="cursor-pointer mt-2 md:mt-0"></div>
          </div>
          <label className="text-xl text-white font-bold mb-3" htmlFor="">
            ADD REVIEW
          </label>
          <input
            type="text"
            value={reviewText}
            onChange={handleReviewTextChange}
            className="text-base leading-normal p-2 bg-gray-700 bg-opacity-60  drop-shadow-xl text-gray-100 w-full pb-14"
            placeholder="Write your review here"
          />
          <div className="flex items-center mb-4 mt-3">
            <span className="mr-2 font-bold text-white">RATING:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                onClick={() => handleRatingChange(star)}
                className={`w-6 h-6 cursor-pointer ${
                  star <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"
                  clipRule="evenodd"
                />
              </svg>
            ))}
          </div>
          <button
            onClick={handleSubmitReview}
            className="bg-black text-white px-4 py-2 rounded-md font-bold font-poppins"
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddReview;

import React, { useEffect, useId, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment-timezone";
import UserAxios from "../../../Axios/userAxios";
import CustomCheckbox from "../../Utilities/CustomCheckBox";
import ViewMap from "../../Utilities/Maps";
import Review from "../Review/Review";
import { io } from "socket.io-client";
import {
 faCaretDown
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const TurfBooking = () => {
  const userAxios = UserAxios();

  const { id } = useParams();
  const imageRef = useRef(null);

  const [showDetails, setShowDetails] = useState(false);
  const [showSlots, setShowSlots] = useState(false);

  const [onBooking, setOnBooking] = useState([])

  const toggleDetails = () => {
    setShowDetails((prevShowDetails) => !prevShowDetails);
  };

  const toggleSlots = () => {
    setShowSlots((prevShowDetails) => !prevShowDetails);
  };

  const today = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
  const maxDate = moment().tz("Asia/Kolkata").add(2,"days").format("YYYY-MM-DD");

  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState("");
  const [date, setDate] = useState(today);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedSlotDisplay, setSelectedSlotDisplay] = useState("");
  const [totalAdvance, setTotalAdvance] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [mapView, setMapView] = useState(false);
  const [reviewData, setReviewData] = useState('');

  const [socket, setSocket] = useState(null)

  const userId=useSelector((state)=>state.User.UserData._id)

  useEffect(() => {
    userAxios
      .get(`/getTurfDetail?id=${id}`)
      .then((res) => {
        const result = res.data.data;
        setData(result);

        // Call 'updateSlots' here during the initial render
        if (result.opening && result.closing) {
          updateSlots(result.opening, result.closing);
        }
      })
      .catch((err) => {
        console.log(err);
        navigate('/error')
      });
  }, []);

  // Update the time slots whenever the 'date' state changes
  useEffect(() => {
    if (data.opening && data.closing) {
      updateSlots(data.opening, data.closing);
    }
  }, [date, data.opening, data.closing]); // This effect will run whenever 'date', 'data.opening', or 'data.closing' changes

  const updateSlots = (opening, closing) => {
    const startTime = parseInt(opening.split(":")[0]);
    const endTime = parseInt(closing.split(":")[0]);

    const currentHour = new Date().getHours();

    const slots = [];
    for (
      let hour =
        currentHour + 2 > startTime && date === today
          ? currentHour + 2
          : startTime;
      hour < endTime;
      hour++
    ) {
      slots.push({
        start: `${hour}:00`,
        end: `${hour + 1}:00`,
      });
    }
    setTimeSlots(slots);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await userAxios.get(`/reviews?id=${id}`);
        const review=response.data
        setReviewData(review)
      } catch (error) {
        console.log(error);
        navigate('/error')
      }
    };
    fetchReviews();
  }, []);

  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const suffix = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}:${minutes} ${suffix}`;
  };

  useEffect(() => {
    const displayString = selectedSlots
      .map((slot) => {
        const [start, end] = slot.split("-");
        return `${start} to ${end}`;
      })
      .join(", ");
    setSelectedSlotDisplay(displayString);
  }, [selectedSlots]);

  useEffect(() => {
    const advancePerSlot = parseFloat(data.advance);
    const totalPerSlot = parseFloat(data.total);
    const numberOfSlots = selectedSlots.length;
    const totalAdvanceAmount = advancePerSlot * numberOfSlots;
    const totalAmount = totalPerSlot * numberOfSlots;
    setTotalAdvance(totalAdvanceAmount);
    setTotalAmount(totalAmount);
  }, [data.advance, selectedSlots, totalAmount]);
 const activate=useRef(false)
 
  const handleSelectSlot = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots((prevSlots) => prevSlots.filter((s) => s !== slot));
      
      socket.emit('removeBooking', id, date, slot, userId)
      clearTimeout(activate.current) 
    } else {
      setSelectedSlots((prevSlots) => [...prevSlots, slot]);
      activate.current = setTimeout(()=>{
        setSelectedSlots((prevSlots) => prevSlots.filter((s) => s !== slot));
        toast.error('Slot deactivated due to exceeded time.')
        socket.emit('removeBooking', id, date, slot, userId)
      }, 60000)
      socket.emit('updateBooking', id, date, slot, userId)
    }
  };

  const handlePayment = async () => {
    if (!date || selectedSlots.length === 0) {
      toast.error("Please select a date and at least one time slot.");
      return;
    }

    try {
      const response = await userAxios.post("/create-checkout-session", {
        turfId: id,
        date,
        selectedSlots,
        totalAdvance,
        totalAmount,
        data,
      });
      if (response.data.error) {
        toast.error(`${response.data.error}[${response.data.slots}]`);
      }
      if (response.data.url) {
        window.location.href = response.data.url;
      }

      console.log(response);
    } catch (error) {
      navigate('/error')
      toast.error("Payment failed. Please try again.");
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLatitude(position.coords.latitude);
          setUserLongitude(position.coords.longitude);
		  console.log(userLatitude+'hjkl')
		  console.log(userLongitude+'bn')
        },
        (error) => {
          navigate('/error')
	       toast.error('Please allow location permission')

        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);


  useEffect(() => {
    const newSocket = io("http://localhost:3000/booking");
    if (newSocket) console.log('connected first')
    setSocket(newSocket);

    return () => {
      if (newSocket) newSocket.disconnect(()=>{
      socket.emit('removeBooking', id, date, slot, userId)
      });
    };
  }, [id]);

  useEffect(() => {
    if (socket) {
      socket.emit("joinBooking", id);

      socket.on("message", (receivedClubId, onBooking) => {
        if (receivedClubId === id) {
          setOnBooking([onBooking])
        }
      });
      socket.on("error", (err) => {
        console.log("error", err);
      });
    }
  }, [socket]);

  const handleMaps = () => {
    if (!mapView) {
      setMapView(true);
    } else {
      setMapView(false);
    }
  };
 

  return (
    <section className="overflow-hidden  font-poppins   m-1 ">
      <div className="  ml-3 mr-3 mt-7 ">
		<Toaster></Toaster>
        <div className="flex justify-between  ">
          {/* <img className="w-[5rem] " src={data.logo} alt="" /> */}
          <h2 className="max-w-xl md:mb-5 text-xl text-white font-bold md:text-3xl">
            {data.turfName}
          </h2>
          <button
            onClick={handleMaps}
            className="w-[5.5rem] h-[2rem] font-bold text-white rounded-md bg-black"
          >
            {!mapView ? "LOCATION" : "CLOSE"}
          </button>
        </div>

        {mapView ? (
          <ViewMap
            turfLongitude={data.longitude}
            turfLatitude={data.latitude}
            userLongitude={userLongitude}
            userLatitude={userLatitude}
			turfName={data.turfName}
			turfLogo={data.logo}
          />
        ) : (
          ""
        )}
        <div className="flex flex-wrap -mx-3 ">
          <div className="w-full  md:w-1/2  bg-gray-900 bg-opacity-60 rounded-lg shadow-2xl">
            <div className="sticky top-0 z-50 overflow-hidden m-2">
              <div className="relative mb-6 lg:mb-10 lg:h-2/4">
                {selectedImage ? (
                  <img
                    src={selectedImage ? selectedImage : ""}
                    onClick={() => {
                      imageRef.current.click();
                    }}
                    alt=""
                    className="object-cover w-full h-40  md:h-96  rounded-lg"
                  />
                ) : (
                  <img
                    src={data ? data.photos[0] : ""}
                    onClick={() => {
                      imageRef.current.click();
                    }}
                    alt=""
                    className="object-cover w-full h-40  md:h-96 mt-4 rounded-lg"
                  />
                )}
              </div>
              <div className="flex-wrap shadow-2xl border bg-black bg-opacity-60 rounded-2xl border-gray-900 flex   mr-2 ml-2">
                {data
                  ? data.photos.map((img) => {
                      return (
                        <div className="p-2 w-3/12 " key={img._id}>
                          <a
                            onClick={() => setSelectedImage(img)}
                            className="block border border-transparent dark:border-transparent dark:hover:border-red-300 hover:border-red-300"
                          >
                            <img
                              src={img || ""}
                              alt=""
                              ref={imageRef}
                              className="object-cover h-20 w-16 md:w-full md:h-20 rounded-md"
                            />
                          </a>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
          <div className="w-full px-4 shadow-2xl bg-black bg-opacity-50  rounded-lg md:w-1/2 ">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="lg:pl-20 mt-4 mb-4">
              <div className="mb-8 mt-1">
                <div className="flex mb-4 mr-3 w-full">
                <font className="inline-block w-2/5 text-gray-100 mr-3 text-lg font-bold font-poppins">
                    RATING
                  </font>
                {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-6 h-6 cursor-pointer  ${
                  star <=reviewData.totalRating? "text-yellow-500" : "text-gray-100"
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
          
                <h2 className="w-full flex text-lg font-semibold mb-4 dark:text-gray-300">
                  <font className="inline-block w-2/5 text-gray-100 mr-3 font-bold font-poppins">
                    TYPE
                  </font>
                  <span>{data ? data.turfType : ""}</span>
                </h2>
                <div className=" flex">
                  <h2 className="w-full text-lg font-semibold align-center mb-4 flex dark:text-gray-300">
                    <div className="w-2/5 text-gray-100 mr-3 font-bold font-poppins">
                      TIMING
                    </div>
                    <span>
                      {`${data && convertTo12HourFormat(data.opening)} to ${
                        data && convertTo12HourFormat(data.closing)
                      }`}
                    </span>
                  </h2>
                </div>
                <h2 className="w-full mr-6 text-lg font-semibold mb-4 dark:text-gray-300">
                  <font className="inline-block w-2/5 text-gray-100 mr-3 font-bold font-poppins">
                    PHONE
                  </font>
                  <span>{data ? data.phone : ""}</span>
                </h2>
                <div className="w-full">
                  <button
                    className="self-start mr-6 text-lg font-semibold text-center w-auto mb-4 dark:text-gray-100 cursor-pointer"
                    onClick={toggleDetails}
                  >
                    <font className="text-black mr-3 px-3 pb-1 font-semibold font-poppins rounded-md bg-white ">
                      {showDetails ? "CLOSE" : "ADDRESS"}<span icon={faCaretDown}></span>
                    </font>
                  </button>
                  {showDetails && (
                    <>
                      <h2 className="w-full flex mr-6 text-lg font-semibold mb-4 text-gray-300">
                        <font className="inline-block w-2/5 text-gray-100 mr-3 font-bold font-poppins">
                          STREET
                        </font>
                        <span>{data ? data.street : ""}</span>
                      </h2>
                      <h2 className="w-full mr-6 text-lg font-semibold mb-4 text-gray-300">
                        <font className="inline-block w-2/5 text-gray-100 mr-3 font-bold font-poppins">
                          CITY
                        </font>
                        {data ? data.city : ""}
                      </h2>
                      <h2 className="w-full mr-6 text-lg font-semibold mb-4 text-gray-300">
                        <font className="inline-block w-2/5 text-gray-100 mr-3 font-bold font-poppins">
                          STATE
                        </font>
                        {data ? data.state : ""}
                      </h2>
                      <h2 className="w-full mr-6 text-lg font-semibold mb-4 text-gray-300">
                        <font className="inline-block w-2/5 text-gray-100 mr-3 font-bold font-poppins">
                          PIN
                        </font>
                        {data ? data.pin : ""}
                      </h2>
                    </>
                  )}
                </div>

                <p className="mt-4 mb-4 text-lg font-bold font-poppins text-gray-100 dark:text-gray-100">
                  <span className="inline-block w-2/5 mr-3">FOR 1 HOUR</span>
                  <span className="text-gray-300">
                    ₹{data ? data.total : ""}
                  </span>
                </p>

                <p className="mb-4 text-lg font-bold font-poppins  text-gray-100 dark:text-gray-100">
                  <span className="mr-3 inline-block w-2/5">
                    ADVANCE AMOUNT
                  </span>
                  <span className="text-gray-300">
                    ₹{data ? data.advance : ""}
                  </span>
                  <span className="text-red-500 text-base ml-4">
                    [NOT REFUNDABLE]
                  </span>
                </p>
                <p className="mt-4 mb-4 text-lg font-bold text-gray-800 font-poppins dark:text-gray-100">
                  <span className="inline-block w-2/5 mr-3">DATE</span>
                  <input
                    type="date"
                    className="text-white rounded-md px-2 py-1 bg-gray-900 "
                    onChange={(e) => handleDateChange(e)}
                    min={today}
                    max={maxDate}
                    defaultValue={today}
                  />
                </p>
                <div className="inline-block mb-8 text-lg font-bold font-poppins text-gray-100 ">
                  <button
                    className="self-start mr-6 text-lg font-semibold text-center w-auto mb-4 dark:text-gray-100 cursor-pointer"
                    onClick={toggleSlots}
                  >
                    <font className="text-white mr-3 px-3 pb-1 font-semibold font-poppins rounded-md bg-black ">
                      {showSlots ? "HIDE TIME SLOTS" : "TIME SLOTS"}
                    </font>
                  </button>
                  {showSlots && (
                    <div className="flex flex-wrap text-gray-300">
                      {timeSlots.map((slot, index) => {
                        const bookedSlot = data.turfBookings.find(
                          (booking) =>
                            booking.bookedDate.split("T")[0] === date &&
                            booking.bookedSlots.some((bookedSlot) =>
                              bookedSlot.includes(`${slot.start}-${slot.end}`)
                            )
                        );

                        let onBookingSlot = false;
                        onBooking.forEach((bookingObj) => {
                          if (bookingObj && bookingObj[date]) {
                            bookingObj[date].forEach(item => {
                              if(item.slot == `${slot.start}-${slot.end}` && item.user != userId)
                                onBookingSlot = true;
                            })
                          }
                        });

                        const isSlotBooked = bookedSlot !== undefined;

                        console.log(onBookingSlot, 'onBooking ------------')
                        return (
                          <div
                            key={index}
                            className={`flex w-1/2 items-center mb-2 ${
                              isSlotBooked ? "booked" : ""
                            }`}
                          >
                            <CustomCheckbox
                              disabled={onBookingSlot}
                              checked={selectedSlots.includes(
                                `${slot.start}-${slot.end}`
                              )}
                              onChange={() => {
                                if (!isSlotBooked) {
                                  handleSelectSlot(`${slot.start}-${slot.end}`);
                                }
                              }}
                            />
                            <label className="text-sm md:text-lg">{`${convertTo12HourFormat(
                              slot.start
                            )} to ${convertTo12HourFormat(slot.end)}`}</label>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                {selectedSlots.length? <div className="">
                  <div className=" mt-4 mb-8 text-lg font-bold font-poppins text-gray-100 ">
                    <span className="mr-5">SELECTED SLOTS</span>
                    <div className="mr-5 text-gray-300">
                      {selectedSlotDisplay}
                    </div>
                  </div>
                  <div className=" mt-4 mb-8 text-lg font-bold font-poppins text-gray-100 ">
                    <span className="mr-3">TOTAL ADVANCE TO BE PAID</span>
                    <span>₹{totalAdvance}</span>
                  </div>
                  <div className=" mt-4 mb-8 text-lg font-bold font-poppins text-gray-100 ">
                    <span className="mr-3">TOTAL AMOUNT</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>:''}
               
              </div>
              <div className="w-32 mb-8"></div>
              <div className="flex flex-wrap items-center -mx-4">
                <div className="w-full px-4 mb-4 lg:mb-0 lg:w-1/2">
                  <button
                    type="submit"
                    onClick={handlePayment}
                    className="flex items-center justify-center w-full p-4 text-red-500 border border-red-500 rounded-md dark:text-gray-200 dark:border-red-600 hover:bg-red-600 hover:border-red-600 hover:text-gray-100 dark:bg-red-600 dark:hover:bg-red-700 dark:hover:border-red-700 dark:hover:text-gray-300"
                  >
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {reviewData.reviews? <Review review={reviewData}/>:<div className="flex justify-center mt-8"><h1 className="text-xl text-white font-bold">NO REVIEW AVAILABLE</h1></div> }
    </section>
  );
};

export default TurfBooking;

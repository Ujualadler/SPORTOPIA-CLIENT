import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import UserAxios from "../../Axios/userAxios";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";


function ChatRoom() {
  const userAxios = UserAxios();
  const clubId = useSelector((state) => state.Club.userClubId);
  const userData = useSelector((state) => state.User.UserData);
  const [message, setMessage] = useState("");
  const [clubData, setClubData] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchData, setFetchData] = useState(false)

  const [page, setPage] = useState(0)

  const messagesHolder = useRef(null)
  const [scrolled, setScrolled] = useState(false)

  const handleScroll = () => {
    scrollY = messagesHolder.current.scrollTop;
    if (scrollY <= 140){
      setFetchData(true)
      setPage(prevPage => prevPage + 1)
    }
      setScrolled(true)
  };

  useEffect(() => {
    messagesHolder.current.addEventListener('scroll', handleScroll)

    return () => {
      if(messagesHolder.current)
      messagesHolder.current.removeEventListener('scroll', handleScroll);
    };
  },[])

  useEffect(() => {
    if(!scrolled)
      messagesHolder.current.scrollTop = messagesHolder.current.scrollHeight;
  }, [messages])

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("https://api.spotopia.site/chat");
    setSocket(newSocket);

    newSocket.on("error",(err)=>{
      console.log(err);
    })

    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, [clubId]);

  useEffect(() => {
    const clubData = async () => {
      try {
        const response =await userAxios.post("/clubDetails",{id:clubId});
        if (response) {
          setClubData(response.data.data)
        }
      } catch (error) {
        console.log(error);
      }
    };

    clubData();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", clubId);

      socket.on("message", (message, receivedClubId) => {
        if (receivedClubId === clubId) {
          setMessages((prevMessages) => [...prevMessages, message]);
        }
      });
      socket.on("error", (err) => {
        console.log("error", err);
      });
    }
  }, [socket]);

  useEffect(() => {
    setLoading(true); 
    try {
      const messageDetails = async () => {
        const response = await userAxios.post("/getMessage", { clubId });
        if (response) {
          const updatedMessages = response?.data?.msg;
          setMessages(updatedMessages);
          setLoading(false); 
        }
      };
      messageDetails();
    } catch (error) {
      console.log(error)
    }
    
  }, []);

  const sendMessage = async () => {
    if (message.length !== 0 && socket) {
      try {
        const response = await userAxios.post("/addMessage", {
          message,
          clubId,
        });
        const updatedMessages = response?.data?.msg;
        console.log(updatedMessages, "alefdhadsiufhaidjfhil");
        setMessage("");
        socket.emit("chatMessage", clubId, updatedMessages);
      } catch (error) {
        // Handle error
        console.log(error, "kkkkkkkk");
      }
    }
  };

  const fetchNewMessages = async () => {
    let response = await userAxios.post("/getMessage", { clubId, page })
    if (response) {
      const updatedMessages = response?.data?.msg;
      setMessages(prevMessages => updatedMessages.concat(prevMessages));
      setLoading(false); 
    }
  }

  if(fetchData){
    fetchNewMessages()
    setFetchData(false)
  }

  return (
    <>
      <div className="flex-1 p-2  sm:p-6 justify-between flex flex-col  h-screen">
        <div className="flex bg-gray-600 bg-opacity-60 sm:items-center justify-between py-3 rounded-xl border-b-2 border-gray-200">
          <div className="relative flex items-center space-x-4 ml-2">
            <div className="relative">
              <img
                src={
                  clubData.logo
                    ? clubData.logo
                    : "https://cdn-icons-png.flaticon.com/512/47/47774.png"
                }
                alt=""
                className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <div className="text-2xl mt-1 flex items-center">
                <span className="text-gray-100 mr-3">{clubData?.clubName}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          id="messages"
          className="flex bg-gray-400 min-h-[70%] rounded-md flex-col space-y-4 md:p-2  overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
        >
          {/* Chat messages go here */}
          <div
            ref={messagesHolder}
            id="messages"
            className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
          {loading ? (
            <div className="flex justify-center mt-40 h-80">
              <ClipLoader color="#ffffff" loading={loading} size={150} />
            </div>
          ):messages?.map((msg, index) => (
              <div  className="chat-message ">
                {msg?.sender?._id == userData?._id ? (
                  <div className="flex justify-end">
                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 ">
                    <div className="relative mr-3 w-full text-sm bg-green-400 py-2 px-4 shadow rounded-md">
                          <div className="break-words text-gray-900">{msg?.message}</div>
                          <small className="text-xs text-gray-700">
                            {" "}
                            {new Date(msg?.createdAt).toLocaleString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}
                          </small>
                        </div>  
                    </div>
                    <img
                      src={
                        msg.sender.image
                          ? msg.sender.image
                          : "https://freepngimg.com/convert-png/62681-flat-icons-face-computer-design-avatar-icon"
                      }
                      alt=""
                      className="w-8 h-8 rounded-full order-1"
                    />
                  </div>
                ) : (
                  <div className="flex items-end">
                    <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                        <div className="relative mr-3 w-full text-sm bg-slate-200 py-2 px-4 shadow rounded-md">
                          <div className="break-words text-gray-900">{msg?.message}</div>
                          <small className="text-xs text-gray-700">
                            {" "}
                            {new Date(msg?.createdAt).toLocaleString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}
                          </small>
                        </div>
                    </div>
                    <img
                      src={
                        msg.sender.image
                          ? msg.sender.image
                          : "https://freepngimg.com/convert-png/62681-flat-icons-face-computer-design-avatar-icon"
                      }
                      alt="My profile"
                      className="w-8 h-8 rounded-full order-1"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="border-t-2 border-gray-200  px-4 pt-4 mb-2 sm:mb-0">
          <div className="relative flex">
            <span className="absolute inset-y-0 flex items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                </svg>
              </button>
            </span>
            <input
            
              type="text"
              onKeyDown={(e)=>{if(e.key==='Enter') {
                sendMessage()
              } }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
            />
            <div className="absolute right-0 items-center inset-y-0  sm:flex">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full  transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                {/* Icon */}
              </button>
              {/* Send button */}
              <button
                type="button"
                onClick={sendMessage}
                className="md:inline-flex items-center justify-center rounded-lg px-4 py-3   transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
              >
                <span className="font-bold md:block hidden">
                  Send
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 md:ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatRoom;

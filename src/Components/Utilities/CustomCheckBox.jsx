import { toast } from "react-toastify";

const CustomCheckbox = ({ checked, onChange, disabled }) => {
  
    return (
      <div
        className={`cursor-pointer checkbox border rounded md:w-6 md:h-6 w-4 h-4 flex items-center justify-center mr-2 ${disabled ? 'border-gray-700 cursor-not-allowed' : 'border-blue-700'}`}
        onClick={()=> {
          if(!disabled)
            onChange()
          else
            toast.error('Another user is already booking the same slot')
        }}
      >
        {checked && (
          <svg
            className="w-4 h-4 text-blue-600 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M20 4L9 15l-5-5" />
          </svg>
        )}
      </div>
    );
  };
  
  export default CustomCheckbox;
 
  
  
  
  
  
  
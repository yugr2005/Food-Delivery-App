import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{
        backgroundImage: `url('https://t3.ftcdn.net/jpg/02/79/75/74/360_F_279757406_PjHAMPHNAEyf5NvyEYlC7mJNRKHHkmCz.jpg')`,
      }}
    >
      {/* Title */}
      <h1 className="text-8xl text-red-600 font-bold mb-8">Zomato</h1>
      
      {/* Description */}
      <p className="text-2xl text-red-600 mb-10 text-center mr-3">
        Discover the best food & drinks near you
      </p>

      {/* Buttons */}
      <div className="flex space-x-4 ">
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-3 bg-white text-red-600 font-semibold rounded-lg transition-all duration-300 transform hover:shadow-lg hover:scale-105"
        >
          Sign up
        </button>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-white text-red-600 font-semibold rounded-lg transition-all duration-300 transform hover:shadow-lg hover:scale-105"
        >
          Login
        </button>
        <button
          onClick={() => navigate("/restrosignup")}
          className="px-6 py-3 bg-white text-red-600 font-semibold rounded-lg transition-all duration-300 transform hover:shadow-lg hover:scale-105"
        >
          Add Restaurant
        </button>
      </div>
    </div>
  );
}

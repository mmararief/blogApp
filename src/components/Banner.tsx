import React from "react";

const Banner = () => {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat rounded-md h-56"
      style={{
        backgroundImage:
          "url('https://asset-2.tstatic.net/pekanbaru/foto/bank/images/Shen-Yinhao-Wasit-Indonesia-vs-Uzbekistan-Ternyata-Punya-Catatan-Kriminal-di-China.jpg')",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-white font-bold text-6xl">BLOGERS</h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;

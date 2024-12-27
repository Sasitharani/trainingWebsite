import React from 'react';

export default function Page1() {
  return (
    <>
      <div id="home" className=" relative flex items-center justify-center min-h-screen">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute left-0 ml-4 mb-96 flex flex-col items-start justify-center h-50 w-85 p-4">
          <p className="text-[8px] text-black">INSPHILE</p>
          <p className="text-[8px] text-black">MANAGEMENT</p>
          <p className="text-[8px] text-black">SOLUTIONS</p>
        </div>
        <div className="absolute left-0 ml-4 flex flex-col items-start justify-center h-50 w-85 p-4 bg-black bg-opacity-35 border-2 border-gray-300 rounded-2xl" id="bridging">
          <h1 className="text-4xl text-green-500">Bridging Top</h1>
          <h1 className="text-4xl text-green-500"> Talent  <span className="text-4xl text-black"> With</span></h1>
          <h1 className="text-4xl text-black">Top Companies</h1>
          <p className="text-sm text-black mt-4">
            With our quick and easy recruitment services you are
          </p>
          <p className="text-sm text-black">
            just one call away from building your dream team!
          </p>
        </div>
        <div className="absolute left-0 ml-28 mt-72 p-4 bg-transparent" id="callButton">
          <button className="px-4 py-2 bg-rose-100 text-black rounded-2xl">Book a Call</button>
        </div>
      </div>
    </>
  );
}
import React from 'react'

function Footer() {
  return (
    <>
    <div
      className="bg-black text-white  text-opacity-40 font-semibold uppercase text-xs tracking-widest bg-opacity-100 px-12 mr-1 ml-1  mt-1"
    >
      <div
        className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12 text-center lg:text-left py-10 md:py-24"
      >
        <div>
          <div className="text-white  md:text-4xl text-2xl font-display">SPORTOPIA</div>
        </div>
        <div>
          <div
            className="font-display text-white uppercase text-sm tracking-widest mb-6"
          >
            More info
          </div>
          <a href="#" className="block mb-4">About</a>
          <a href="#" className="block mb-4">Info</a>
          <a href="#" className="block mb-4">FAQ</a>
        </div>
        <div>
          <div
            className="font-display text-white uppercase text-sm tracking-widest mb-6"
          >
            Helpful Links
          </div>
          <a href="#" className="block mb-4">About</a>
          <a href="#" className="block mb-4">Info</a>
          <a href="#" className="block mb-4">FAQ</a>
        </div>
        <div>
          <div
            className="font-display text-white uppercase text-sm tracking-widest mb-6"
          >
            Find out more
          </div>
          <a href="#" className="block mb-4">About</a>
          <a href="#" className="block mb-4">Info</a>
          <a href="#" className="block mb-4">FAQ</a>
        </div>
      </div>
      <div
        className="text-sm lg:text-base text-center font-heading font-light tracking-widest uppercase text-white opacity-75 pb-24"
      >
        ©2023 DESIGN BY UJUAL
      </div>
    </div>
    </>
  )
}

export default Footer
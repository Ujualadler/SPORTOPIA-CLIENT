import { useEffect, useRef, useState } from "react";
import "./Carousal.css";

export default function Carousal({
  slides,
  interval = 1000,
  auto = true,
  padding = null,
}) {
  const sliderTrackRef = useRef(null);
  const [sliderWidth, setSliderWidth] = useState(null);
  const [sliderLength, setSliderLength] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(1);

  useEffect(() => {
    const sliders = document.getElementsByClassName("carousel-item");
    const slider = sliders[0];
    if (slider) {
      setSliderWidth(slider.offsetWidth);
      setSliderLength(sliders.length);
    }
  }, []);

  useEffect(() => {
    const intervalFunction = () => {
      if (currentSlide === sliderLength) {
        sliderTrackRef.current.scrollLeft = 0;
        setCurrentSlide(1);
      } else {
        handleNextClick();
      }
    };

    let intervalId;

    if (auto) {
      intervalId = setInterval(intervalFunction, interval * 1000);
    }

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [currentSlide, sliderWidth]);

  const handleNextClick = () => {
    if (currentSlide === 1) sliderTrackRef.current.scrollLeft = sliderWidth;
    else sliderTrackRef.current.scrollLeft = currentSlide * sliderWidth;
    setCurrentSlide((prevSlider) => prevSlider + 1);
  };
  const handlePrevClick = () => {
    if (currentSlide === 1) {
      sliderTrackRef.current.scrollLeft = 0;
      setCurrentSlide((prevSlider) => prevSlider - 1);
    } else if (currentSlide > 1) {
      sliderTrackRef.current.scrollLeft = (currentSlide - 2) * sliderWidth;
      setCurrentSlide((prevSlider) => prevSlider - 1);
    }
  };

  return (
    <>
      <div
        className="slider-holder"
        style={{ padding: `${padding ? padding + "px" : "5px"}` }}
      >
        <div className="slider overflow-hidden">
          <div className="slider-track flex" ref={sliderTrackRef}>
            {slides.length > 0 &&
              slides.map((slide) => (
                <div
                  key={slide.id}
                  id={`slide-${slide.id}`}
                  className="carousel-item relative w-full h-auto snap-x snap-mandatory"
                >
                  <img src={slide.image} className="w-full" />
                  <div className="slide-text absolute">
                    <h3 className="slider-head font-bold hover:text-slate-300 md:text-3xl text-2xl  tracking-widest">
                      {slide.title}
                    </h3>
                    <p className="sub-text font-bold  text-slate-300 text-xl mt-3  tracking-widest">
                      {slide.subTitle}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="absolute flex justify-between text-white transform -translate-y-1/2 left-5 right-5 top-1/2">
          {currentSlide > 1 ? (
            <button
              className="btn btn-circle  absolute left-0"
              onClick={handlePrevClick}
            >
              ❮
            </button>
          ) : null}
          {currentSlide < sliderLength ? (
            <button
              className="btn btn-circle absolute right-0"
              onClick={handleNextClick}
            >
              ❯
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

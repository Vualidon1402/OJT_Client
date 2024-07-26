import React, { useEffect, useState } from "react";
import "./Carousel.scss";
import { useSelector } from "react-redux";
import { StoreType } from "@/store";


function Carousel() {
  const bannerStore = useSelector((store: StoreType) => {
    return store.bannerStore.data;
  });
  const [currentSlide, setCurrentSlide] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const images: string[] = bannerStore?.map((banner) => banner.image) ?? [];
  const plusSlides = (n: number) => {
    let newSlide = currentSlide + n;
    if (newSlide >= images.length) {
      newSlide = 0;
    } else if (newSlide < 0) {
      newSlide = images.length - 1;
    }
    setCurrentSlide(newSlide);
    if (newSlide < startIndex || newSlide >= startIndex + 5) {
      setStartIndex(newSlide - (newSlide % 5));
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      plusSlides(1);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [currentSlide]);
  return (
    <div className="carousel">
      <div className="container">
        {bannerStore?.map((img, index) => (
          <div
            key={index}
            className={`mySlides ${currentSlide === index ? "active" : ""}`}
          >
            <img src={img.image} alt={img.title} />
          </div>
        ))}
        <a className="prev" onClick={() => plusSlides(-1)}>
          &#10094;
        </a>
        <a className="next" onClick={() => plusSlides(1)}>
          &#10095;
        </a>
      </div>

      <div className="thumbnail-container">
        {bannerStore?.slice(startIndex, startIndex + 5).map((img, index) => (
          <div
            key={index}
            className={`thumbnail ${
              currentSlide === index + startIndex ? "active" : ""
            }`}
            onClick={() => setCurrentSlide(index + startIndex)}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;

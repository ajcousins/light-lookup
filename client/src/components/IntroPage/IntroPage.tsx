import React from "react";
import image01 from "../../imgs/intro-page/ferdinand-stohr_02.jpg";
import image02 from "../../imgs/intro-page/room2_02.png";
import FullImageSection from "./FullImageSection";
import SubSection01 from "./SubSection01";

export default function IntroPage() {
  return (
    <div className='intro-page'>
      <FullImageSection
        src={image01}
        headline='A search tool for Lighting Designers and specifiers of technical
                lighting equipment.'
        cta='Find the perfect product for your project now...'
        photoCredit={{
          text: "Photo by Ferdinand Stöhr on Unsplash",
          link: "https://unsplash.com/@fellowferdi",
        }}
      />

      <SubSection01 />

      <FullImageSection
        rightSide
        src={image02}
        headline='Search for products by size, colour, IP rating, light quality, and many more...'
        cta='The only database dedicated to technical lighting products, which searches across manufacturers. 
        Use the search tool now.'
      />
    </div>
  );
}

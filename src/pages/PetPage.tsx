import { useState } from "react";

const PetPage = () => {
  const [imageSrc, setImageSrc] = useState("/images/sitting.png");

  return (
    <div className="w-full h-full text-white flex flex-col justify-center items-center !p-5  select-none">
      <div>
        <div className="flex-1 flex items-center justify-center !mt-20">
          <img
            src={imageSrc}
            alt="sitting_pet"
            className="w-full max-h-[30vh] object-contain"
          />
        </div>
        <div>
          <div className="!my-2 flex justify-center items-center gap-10 w-full">
            <button
              className="rounded-full secondary !p-2 max-h-20 max-w-20 flex justify-center items-center cursor-pointer"
              onClick={() => {
                setImageSrc(() => {
                  return "/images/sitting.png";
                });
              }}
            >
              <img src="/images/sunicon.png" alt="sun_icon" />
            </button>
            <button
              className="rounded-full secondary !p-2 max-h-20 max-w-20 flex justify-center items-center cursor-pointer"
              onClick={() => {
                setImageSrc(() => {
                  return "/images/sleeping.png";
                });
              }}
            >
              <img src="/images/moonicon.png" alt="moon_icon" />
            </button>
            <button
              className="rounded-full secondary !p-2 max-h-20 max-w-20 flex justify-center items-center cursor-pointer"
              onClick={() => {
                setImageSrc(() => {
                  return "/images/eating1.png";
                });
              }}
            >
              <img src="/images/foodicon.png" alt="food_icon" />
            </button>
            <button
              className="rounded-full secondary !p-2 max-h-20 max-w-20 flex justify-center items-center cursor-pointer"
              onClick={() => {
                setImageSrc(() => {
                  return "/images/walk.png";
                });
              }}
            >
              <img src="/images/walkingicon.png" alt="walking_icon" />
            </button>
          </div>

          <div className="!py-5 !px-5 !my-5 flex flex-col items-center w-full gap-5 rounded-2xl secondary">
            <div className="w-full flex flex-col gap-2">
              <div>Happiness</div>
              <div className="rounded-full bg-green-800 h-8 w-full"></div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <span>Hungry</span>
              <div className="rounded-full bg-green-800 h-8 w-full"></div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <span>Energy</span>
              <div className="rounded-full bg-green-800 h-8 w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PetPage };

import { useEffect, useState } from "react";

type PetState = "idle" | "sleeping" | "eating" | "walking";

const PetPage = () => {
  const [imageSrc, setImageSrc] = useState("/images/sitting.png");
  const [state, setState] = useState<PetState>("idle");

  useEffect(() => {
    console.log("State changed to:", state);
    let interval: ReturnType<typeof setInterval>;
    let timeout: ReturnType<typeof setTimeout>;

    if (state === "eating") {
      let eatingFrame = 1;
      interval = setInterval(() => {
        eatingFrame = (eatingFrame % 2) + 1;
        setImageSrc(`/images/eating${eatingFrame}.png`);
      }, 300);

      timeout = setTimeout(() => {
        setState("idle");
      }, 5000);
    }

    if(state === "idle") {
      setImageSrc("/images/sitting.png");
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [state]);

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
                setState("idle");
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
                setState("sleeping");
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
                setState("eating");
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
                setState("walking");
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

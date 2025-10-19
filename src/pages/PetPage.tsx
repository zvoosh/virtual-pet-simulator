import { useEffect, useState } from "react";

type PetState = "idle" | "sleeping" | "eating" | "walking";

type PetStatus = {
  happiness: number;
  hunger: number;
  energy: number;
};

const initialStatus: PetStatus = {
  happiness: 100,
  hunger: 100,
  energy: 100,
};

const DECAY_RATE_PER_MINUTE = 100 / 720; // 100 points over 12 hours in minutes
const MS_PER_MINUTE = 1000 * 60;

const PetPage = () => {
  const [imageSrc, setImageSrc] = useState<string>("/images/sitting.png");
  const [state, setState] = useState<PetState>("idle");
  const [status, setStatus] = useState<PetStatus>(initialStatus);

  useEffect(() => {
    const saved = localStorage.getItem("petStatus");

    if (saved) {
      const {
        happiness,
        hunger,
        energy,
        timestamp,
      }: PetStatus & { timestamp: number } = JSON.parse(saved);
      const minutesPassed = (Date.now() - timestamp) / MS_PER_MINUTE;

      const decayedStatus: PetStatus = {
        happiness: Math.floor(
          Math.max(happiness - minutesPassed * DECAY_RATE_PER_MINUTE, 0)
        ),
        hunger: Math.floor(
          Math.max(hunger - minutesPassed * DECAY_RATE_PER_MINUTE, 0)
        ),
        energy: Math.floor(
          Math.max(energy - minutesPassed * DECAY_RATE_PER_MINUTE, 0)
        ),
      };

      setStatus(decayedStatus);
    } else {
      localStorage.setItem(
        "petStatus",
        JSON.stringify({ ...initialStatus, timestamp: Date.now() })
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "petStatus",
      JSON.stringify({ ...status, timestamp: Date.now() })
    );
  }, [status]);

  useEffect(() => {
    console.log("State changed to:", state);
    let interval: ReturnType<typeof setInterval>;
    let timeout: ReturnType<typeof setTimeout>;

    if (state === "eating") {
      let eatingFrame = 1;
      interval = setInterval(() => {
        eatingFrame = (eatingFrame % 2) + 1;
        setImageSrc(`/images/eating${eatingFrame}.png`);
        setStatus((prev) => ({
          ...prev,
          hunger: Math.min(prev.hunger + 16, 100),
          happiness: Math.min(prev.happiness + 7, 100),
        }));
      }, 300);

      timeout = setTimeout(() => {
        setState("idle");
      }, 5000);
    }

    if (state === "sleeping") {
      let eatingFrame = 1;
      interval = setInterval(() => {
        eatingFrame = (eatingFrame % 2) + 1;
        setImageSrc(`/images/sleeping${eatingFrame}.png`);
      }, 200);

      timeout = setTimeout(() => {
        setState("idle");
      }, 7000);
    }
    if (state === "walking") {
      let eatingFrame = 1;
      interval = setInterval(() => {
        eatingFrame = (eatingFrame % 2) + 1;
        setImageSrc(`/images/walk${eatingFrame}.png`);
      }, 300);

      timeout = setTimeout(() => {
        setState("idle");
      }, 12000);
    }

    if (state === "idle") {
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
                  return "/images/sleeping1.png";
                });
                setState("sleeping");
              }}
            >
              <img src="/images/moonicon.png" alt="moon_icon" />
            </button>
            <button
              className="rounded-full secondary !p-2 max-h-20 max-w-20 flex justify-center items-center cursor-pointer"
              onClick={() => {
                setState("eating");
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
                  return "/images/walk1.png";
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
              <div
                className="rounded-full bg-green-800 h-8"
                style={{ width: `${status.happiness}%` }}
              ></div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <span>Hungry</span>
              <div
                className="rounded-full bg-green-800 h-8"
                style={{ width: `${status.hunger}%` }}
              ></div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <span>Energy</span>
              <div
                className="rounded-full bg-green-800 h-8"
                style={{ width: `${status.energy}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PetPage };

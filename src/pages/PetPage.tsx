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

const DECAY_RATE_PER_MINUTE = 100 / 86400; // 100 points over 12 hours in minutes
const MS_PER_MINUTE = 1000 * 60;

const PetPage = () => {
  const [imageSrc, setImageSrc] = useState<string>("/images/sitting.png");
  const [state, setState] = useState<PetState>("idle");
  const [status, setStatus] = useState<PetStatus>(initialStatus);

  const initializeCountdown = () => {
    const savedStatus = localStorage.getItem("petStatus");
    if (savedStatus) {
      const parsedStatus = JSON.parse(savedStatus);
      const timeElapsed = Date.now() - parsedStatus.timestamp;
      const decayAmount = (DECAY_RATE_PER_MINUTE * timeElapsed) / MS_PER_MINUTE;
      setStatus({
        happiness: Math.floor(
          Math.max(parsedStatus.happiness - decayAmount, 0)
        ),
        hunger: Math.floor(Math.max(parsedStatus.hunger - decayAmount, 0)),
        energy: Math.floor(Math.max(parsedStatus.energy - decayAmount, 0)),
      });
    } else {
      setStatus(initialStatus);
    }
  };

  useEffect(() => {
    initializeCountdown();

    const interval = setInterval(() => {
      setStatus((prev) => ({
        happiness: Math.floor(
          Math.max(prev.happiness - DECAY_RATE_PER_MINUTE, 0)
        ),
        hunger: Math.floor(Math.max(prev.hunger - DECAY_RATE_PER_MINUTE, 0)),
        energy: Math.floor(Math.max(prev.energy - DECAY_RATE_PER_MINUTE, 0)),
      }));
    }, MS_PER_MINUTE);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "petStatus",
      JSON.stringify({ ...status, timestamp: Date.now() })
    );
  }, [status]);
  useEffect(() => {
    console.log("State changed to:", state);
    let interval: ReturnType<typeof setInterval> | undefined;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    if (state === "eating") {
      let frame = 1;
      interval = setInterval(() => {
        frame = (frame % 2) + 1;
        setImageSrc(`/images/eating${frame}.png`);
        setStatus((prev) => ({
          ...prev,
          hunger: Math.min(prev.hunger + 1.2, 100),
          happiness: Math.min(prev.happiness + 0.4, 100),
        }));
      }, 500);

      timeout = setTimeout(() => {
        setState("idle");
      }, 5000);
    }

    if (state === "sleeping") {
      let frame = 1;
      interval = setInterval(() => {
        frame = (frame % 2) + 1;
        setImageSrc(`/images/sleeping${frame}.png`);
        setStatus((prev) => ({
          ...prev,
          hunger: Math.max(prev.hunger - 100 / 172800, 0), // 24h decay
          energy: Math.min(prev.energy + 1, 100),
          happiness: Math.min(prev.happiness + 0.3, 100),
        }));
      }, 500);
    }

    if (state === "walking") {
      let frame = 1;
      interval = setInterval(() => {
        frame = (frame % 2) + 1;
        setImageSrc(`/images/walk${frame}.png`);
        setStatus((prev) => ({
          ...prev,
          happiness: Math.min(prev.happiness + 0.6, 100),
        }));
      }, 500);

      timeout = setTimeout(() => {
        setState("idle");
      }, 4000);
    }

    if (state === "idle") {
      setImageSrc("/images/sitting.png");
    }

    return () => {
      if (interval) clearInterval(interval);
      if (timeout) clearTimeout(timeout);
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
                setState("idle");
              }}
            >
              <img src="/images/sunicon.png" alt="sun_icon" />
            </button>
            <button
              className="rounded-full secondary !p-2 max-h-20 max-w-20 flex justify-center items-center cursor-pointer"
              onClick={() => {
                setState("sleeping");
              }}
            >
              <img src="/images/moonicon.png" alt="moon_icon" />
            </button>
            <button
              className="rounded-full secondary !p-2 max-h-20 max-w-20 flex justify-center items-center cursor-pointer"
              onClick={() => {
                setState("eating");
              }}
            >
              <img src="/images/foodicon.png" alt="food_icon" />
            </button>
            <button
              className="rounded-full secondary !p-2 max-h-20 max-w-20 flex justify-center items-center cursor-pointer"
              onClick={() => {
                setState("walking");
              }}
            >
              <img src="/images/walkingicon.png" alt="walking_icon" />
            </button>
          </div>

          <div className="!py-5 !px-5 !my-5 flex flex-col items-center w-full gap-5 rounded-2xl secondary">
            <div className="w-full flex flex-col gap-2">
              <div>
                Happiness
                <span className="!mx-2">
                  {Math.floor(Math.max(status.happiness))}%
                </span>
              </div>
              <div
                className="rounded-full bg-green-800 h-3"
                style={{
                  width: `${Math.floor(status.happiness)}%`,
                  minWidth: "20px",
                }}
              ></div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <span>
                Hungry
                <span className="!mx-2">
                  {Math.floor(Math.max(status.hunger))}%
                </span>
              </span>
              <div
                className="rounded-full bg-green-800 h-3"
                style={{
                  width: `${Math.floor(status.hunger)}%`,
                  minWidth: "20px",
                }}
              ></div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <span>
                Energy
                <span className="!mx-2">
                  {Math.floor(Math.max(status.energy))}%
                </span>
              </span>
              <div
                className="rounded-full bg-green-800 h-3"
                style={{
                  width: `${Math.floor(status.energy)}%`,
                  minWidth: "20px",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PetPage };

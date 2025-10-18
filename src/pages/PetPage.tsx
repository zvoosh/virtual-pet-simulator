const PetPage = () => {
  return (
    <div className="w-full h-full primary text-white flex flex-col justify-center items-center !p-5  select-none">
      <div>
        <div className="flex-1 flex items-center justify-center">
          <img
            src="/images/sitting.png"
            alt="sitting_pet"
            className="w-full max-h-[60vh] object-contain"
          />
        </div>
        <div>
          <div className="!my-2 flex justify-center items-center gap-10 w-full">
            <div className="rounded-full secondary !p-2 max-h-20 max-w-20 flex justify-center items-center cursor-pointer">
              <img src="/images/sunicon.png" alt="sun_icon" />
            </div>
            <div className="rounded-full secondary !p-2 max-h-20 max-w-20 flex justify-center items-center cursor-pointer">
              <img src="/images/moonicon.png" alt="moon_icon" />
            </div>
            <div className="rounded-full secondary !p-2 max-h-20 max-w-20 flex justify-center items-center cursor-pointer">
              <img src="/images/foodicon.png" alt="food_icon" />
            </div>
            <div className="rounded-full secondary !p-2 max-h-20 max-w-20 flex justify-center items-center cursor-pointer">
              <img src="/images/walkingicon.png" alt="walking_icon" />
            </div>
          </div>

          <div className="!p-5 !pt-10 flex flex-col items-center w-full gap-5 ">
            <div className="w-full h-10 flex justify-between gap-5">
              <span>Happiness</span>
              <div className="rounded-full bg-green-500 h-8 w-50"></div>
            </div>
            <div className="w-full h-10 flex justify-between gap-5">
              <span>Hungry</span>
              <div className="rounded-full bg-green-500 h-8 w-50"></div>
            </div>
            <div className="w-full h-10 flex justify-between gap-5">
              <span>Energy</span>
              <div className="rounded-full bg-green-500 h-8 w-50"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PetPage };

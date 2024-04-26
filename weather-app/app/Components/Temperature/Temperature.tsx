"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { kelvinToCelcious } from "@/app/utils/misc";
import { useState } from "react";

function Temperature() {
  const { forecast } = useGlobalContext();
  const { main, timezone, name, weather } = forecast;
  if (!forecast || !weather) {
    return <div>Loading...</div>;
  }
  const temp = kelvinToCelcious(main?.temp);
  const min_temp = kelvinToCelcious(main?.temp_min);
  const max_temp = kelvinToCelcious(main?.temp_max);

  //State
  const [localTime, setLocalTime] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");

  return (
    <div className="pt-6 pb-5 border rounded-lg flex flex-col justify-between dark:bg-dark-grey shadow-sm dark:shadow-none">
      Temperature
    </div>
  );
}

export default Temperature;

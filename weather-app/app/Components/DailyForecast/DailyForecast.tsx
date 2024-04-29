"use client";

import { useGlobalContext } from "@/app/context/globalContext";
import { clearSky, cloudy, drizzleIcon, rain, snow } from "@/app/utils/icons";
import { kelvinToCelcious } from "@/app/utils/misc";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import moment from "moment";

function Dailyforecast() {
  const { forecast, fiveDayForecast } = useGlobalContext();

  const { weather } = forecast;
  const { city, list } = fiveDayForecast;

  if (!fiveDayForecast || !city || !list) {
    return <Skeleton className="h-[12rem] w-full" />;
  }
  if (!forecast || !weather) {
    return <Skeleton className="h-[12rem] w-full" />;
  }

  const { main: weatherMain } = weather[0];
  const getIcon = () => {
    switch (weatherMain) {
      case "Drizzle":
        return drizzleIcon;
      case "Rain" || "Thunderstorm":
        return rain;
      case "Snow":
        return snow;
      case "Clear":
        return clearSky;
      case "Clouds":
        return cloudy;
      default:
        return clearSky;
    }
  };
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  // filter the list for today's forecast
  const todayForecast = list.filter(
    (forecastItem: { dt_txt: string; main: { temp: number } }) => {
      return forecastItem.dt_txt.startsWith(todayString);
    },
  );
  return (
    <div className="pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none col-span-full sm-2:col-span-2 md:col-span-2 xl:col-span-2">
      <div className="h-full flex gap-10 overflow-hidden">
        {todayForecast.length < 1 ? (
          <h1 className="text-[3rem] line-through text-rose-500">
            No Data Available!
          </h1>
        ) : (
          <div className="w-full">
            <Carousel>
              <CarouselContent>
                {todayForecast.map(
                  (forecast: { dt_txt: string; main: { temp: number } }) => {
                    return (
                      <CarouselItem
                        key={forecast.dt_txt}
                        className="flex flex-col gap-4 basis-[8.5rem] cursor-grab"
                      >
                        <p className="text-gray-300 ">
                          {moment(forecast.dt_txt).format("HH:mm")}
                        </p>
                        <p>{getIcon()}</p>
                        <p className="mt-4">
                          {kelvinToCelcious(forecast.main.temp)}°C
                        </p>
                      </CarouselItem>
                    );
                  },
                )}
              </CarouselContent>
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dailyforecast;

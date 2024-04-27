"use client";
import { useGlobalContext } from "@/app/context/globalContext";
import { Skeleton } from "@/components/ui/skeleton";

function AirPollution() {
  const { airQuality } = useGlobalContext();

  // check if airQuality is available
  if (
    !airQuality ||
    !airQuality.list ||
    !airQuality.list[0] ||
    !airQuality.list[0].main
  ) {
    return <Skeleton className="h-[12rem] w-full col-span-2" />;
  }
  return (
    <div className="air-pollution col-span-full sm-2:col-span-2 pt-6 px-4 h-[12rem] border rounded-lg flex flex-col gap-8 dark:bg-dark-grey shadow-sm dark:shadow-none">
      AirPollution
    </div>
  );
}

export default AirPollution;

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
    return <Skeleton className="h-[1rem] w-full col-span-2" />;
  }
  return <div>AirPollution</div>;
}

export default AirPollution;

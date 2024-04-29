import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const lat = 56.1199999;
    const lon = 93.335;

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;
  } catch (error) {}
}

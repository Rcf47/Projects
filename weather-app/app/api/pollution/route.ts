import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const lat = 56.1199999;
    const lon = 93.335;

    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const res = await axios.get(url);
    return NextResponse.json(res.data);
  } catch (error) {
    console.log("Error fetching polluting data: ");
    return new Response("Error polluting forecast data", { status: 500 });
  }
}
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const resp = await axios.get('http://10.51.8.26:8080/list');
  return NextResponse.json(resp.data);
}

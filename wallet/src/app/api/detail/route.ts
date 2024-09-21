import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const resp = await axios.get(`http://10.51.8.26:8080/detail?investmentId=${id}`);
    return NextResponse.json(resp.data);
  } catch (error) {
    console.error('Error fetching detail:', error);
    return NextResponse.json({ error: 'Failed to fetch detail' }, { status: 500 });
  }
}

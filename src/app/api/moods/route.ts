import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Mood from "@/models/moodModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const { date, choice } = await request.json();

    const userId = await getDataFromToken();
    if (!userId) {
      return NextResponse.json(
        { error: "You aren't authorized to make this request" },
        { status: 400 }
      );
    }

    const mood = await Mood.findOne({ userId, createdAt: date });

    if (mood) {
      return NextResponse.json(
        { error: "This mood has already been created" },
        { status: 400 }
      );
    }

    const newMood = new Mood({
      createdAt: date,
      userId,
      choice,
    });

    const savedMood = await newMood.save();

    return NextResponse.json({ data: savedMood, success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { choice, _id } = await request.json();
    const userId = getDataFromToken();
    if (!userId) {
      return NextResponse.json(
        { error: "You aren't authorized to make this request" },
        { status: 400 }
      );
    }

    const mood = await Mood.findByIdAndUpdate(_id, { choice });

    if (!mood) {
      return NextResponse.json(
        { error: "Mood has been created yet" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

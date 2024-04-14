import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Anxiety from "@/models/anxietyModel";
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

    const anxiety = await Anxiety.findOne({ userId, createdAt: date });

    if (anxiety) {
      return NextResponse.json(
        { error: "This anxiety has already been created" },
        { status: 400 }
      );
    }

    const newAnxiety = new Anxiety({
      createdAt: date,
      userId,
      choice,
    });

    const savedAnxiety = await newAnxiety.save();

    return NextResponse.json({ data: savedAnxiety, success: true });
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

    const anxiety = await Anxiety.findByIdAndUpdate(_id, { choice });

    if (!anxiety) {
      return NextResponse.json(
        { error: "Anxiety has been created yet" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

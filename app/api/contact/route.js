import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    message: { type: String, required: true, trim: true }
  },
  {
    timestamps: true
  }
);

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const contact = await Contact.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message
    });

    return NextResponse.json(
      {
        ok: true,
        id: contact._id
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error.message
      },
      { status: 500 }
    );
  }
}

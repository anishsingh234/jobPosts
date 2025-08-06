// app/api/seed/route.ts
import { NextResponse } from "next/server";
import prismaclient from "@/services/prisma";
import { jobs } from "@/app/data";

export async function POST() {
  const jobdata = jobs.data;
  const categories = ["Full Time", "Part Time", "Contract"];
  const applyThroughOptions = ["Google", "LinkedIn", "Github"];

  if (!Array.isArray(jobdata)) {
    return NextResponse.json({ success: false, message: "Invalid job data" });
  }

  try {
    for (const item of jobdata) {
      await prismaclient.openings.create({
        data: {
          title: item.job_title,
          description: item.job_description,
          location: item.job_location,
          salary: Number(Math.round(Math.random() * 10000)),
          category: categories[Math.floor(Math.random() * categories.length)],
          employment_type: item.job_employment_type,
          apply_through: applyThroughOptions[Math.floor(Math.random() * applyThroughOptions.length)],
        },
      });
    }

    return NextResponse.json({ success: true, message: "Seeded successfully" });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json({ success: false, message: "Seeding failed" }, { status: 500 });
  }
}

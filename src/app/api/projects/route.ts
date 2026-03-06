import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const projectName = formData.get("project_name") as string;
    const projectType = formData.get("project_type") as string;
    const structuralSystem = formData.get("structural_system") as string;
    const file = formData.get("file") as File;

    if (!projectName || !projectType || !structuralSystem || !file) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    // Upload file to Supabase Storage
    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("project-files")
      .upload(fileName, file, {
        contentType: "application/pdf",
      });

    if (uploadError) {
      return NextResponse.json(
        { error: `File upload failed: ${uploadError.message}` },
        { status: 500 }
      );
    }

    const filePath = fileName;

    // Insert record into projects table
    const { data, error: insertError } = await supabase
      .from("projects")
      .insert({
        project_name: projectName,
        project_type: projectType,
        structural_system: structuralSystem,
        file_path: filePath,
        status: "queued",
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json(
        { error: `Database insert failed: ${insertError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Audit project created successfully", project: data },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

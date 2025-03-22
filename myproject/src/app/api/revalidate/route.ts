// app/api/revalidate/route.js
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        revalidatePath("/");
        revalidatePath("/blogs");
        revalidatePath("/admin/dashboard");
        return NextResponse.json({ success: true, message: "Paths revalidated successfully" });
    } catch (error) {
        console.error("Error revalidating paths:", error);
        return NextResponse.json({ success: false, message: "Failed to revalidate paths" }, { status: 500 });
    }
}
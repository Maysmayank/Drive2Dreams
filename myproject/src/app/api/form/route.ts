import dbConnect from "@/lib/dbConnect";
import { google } from "googleapis";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {    
    await dbConnect();
    
    try {
        const { username, email, phone_number, program } = await req.json();

        // Get current date and time
        const date = new Date();

        // Format timestamp as dd-mm-yy hh:mm:ss AM/PM
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const seconds = date.getSeconds().toString().padStart(2, "0");
        const amPm = hours >= 12 ? "PM" : "AM";

        // Convert 24-hour format to 12-hour format
        hours = hours % 12 || 12; // Convert 0 to 12 for midnight

        const formattedTimestamp = `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getFullYear().toString().slice(-2)} ${hours.toString().padStart(2, "0")}:${minutes}:${seconds} ${amPm}`;

        // Prepare Google Auth
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL_GSHEETS,
                private_key: process.env.GOOGLE_CLIENT_API_KEY_GSHEETS?.replace(/\\n/g, '\n')
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"]
        });

        const sheets = google.sheets({ auth, version: "v4" });

        // Append Data to Google Sheets
        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: "A:F",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [
                    [username, email, phone_number, program, formattedTimestamp] // Using formatted date and time with AM/PM
                ]
            }
        });

        return new Response(
            JSON.stringify({
                success: true,
                message: "Form filled successfully",
            }), 
            { status: 201 }
        );

    } catch (error) {
        console.error("Google Sheets API Error:", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error in Form internal server in form/route"
            }), 
            { status: 500 }
        );
    }
}

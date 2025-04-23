import dbConnect from "@/lib/dbConnect";
import { google } from "googleapis";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {    
    await dbConnect();
    
    try {
        const { username, email, phone_number, program } = await req.json();

        // Get current date and time in local timezone
        const date = new Date();
        const localDate = new Intl.DateTimeFormat("en-US", {
            timeZone: "Asia/Kolkata",  // Set to your desired timezone
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        }).formatToParts(date);

        // Extract formatted values
        let day = localDate.find((p) => p.type === "day")?.value;
        let month = localDate.find((p) => p.type === "month")?.value;
        let year = localDate.find((p) => p.type === "year")?.value;
        let hours = localDate.find((p) => p.type === "hour")?.value;
        let minutes = localDate.find((p) => p.type === "minute")?.value;
        let seconds = localDate.find((p) => p.type === "second")?.value;
        let amPm = localDate.find((p) => p.type === "dayPeriod")?.value;

        // Format timestamp as dd-mm-yy hh:mm:ss AM/PM
        const formattedTimestamp = `${day}-${month}-${year} ${hours}:${minutes}:${seconds} ${amPm}`;

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
            range: "WebsiteContactForm!A:F",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [
                    [username, email, phone_number, program, formattedTimestamp] // Using fixed timezone timestamp
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

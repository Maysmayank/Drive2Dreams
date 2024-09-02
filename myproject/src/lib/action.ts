'use server'
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function revalidateCourseData() {
    console.log('Revalidating path...');
    revalidatePath('/');
  
}
// this function revalidate the path to / when admin hits add the new courseInfo to Database
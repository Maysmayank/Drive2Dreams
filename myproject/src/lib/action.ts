'use server'
import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidateCourseData() {
    console.log('Revalidating path...')
    revalidatePath('/')
    revalidatePath('/admin/dashboard')
}
// this function revalidate the path to / when admin hits add the new courseInfo to Database
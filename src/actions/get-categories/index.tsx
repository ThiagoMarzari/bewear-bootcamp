"use server"

import { asc } from "drizzle-orm"

import { db } from "@/db"
import { categoryTable } from "@/db/schema"



export async function getCategories() {
    const categories = await db.query.categoryTable.findMany({
        orderBy: [asc(categoryTable.name)]
    })

    return categories;
}
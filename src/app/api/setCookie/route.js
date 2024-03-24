import {cookies} from "next/headers";
import { NextResponse } from "next/server";
import db from "../../db";
import { headers } from "next/headers";

export async function POST
(request){
    

    try {
        let cookie = await request.json();
        cookies().set("isLoggedIn", cookie, {secure: true, httpOnly: true});
        return NextResponse.json({});
    } catch (err){
        return new Response(
            JSON.stringify({error: err.message || err.toString()}),{
            status: 500,
            headers: {
                "Content-Type": "application/json",
            }
        }
        );
    }
}
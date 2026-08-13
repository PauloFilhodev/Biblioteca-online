import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest)
{
    const isAuthenticated = request.cookies.get('token')?.value;
    
    if (!isAuthenticated)
    {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*']
}
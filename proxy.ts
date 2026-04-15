import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function proxy(request: NextRequest) {

    // ✅ BYPASS AUTH IN DEVELOPMENT (MOST IMPORTANT)
    if (process.env.NODE_ENV === 'development') {
        return NextResponse.next();
    }

    const { isAuthenticated } = getKindeServerSession();

    if (!await isAuthenticated()) {
        return NextResponse.redirect(
            new URL('/api/auth/login?post_login_redirect_url=/dashboard', request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard', '/workspace/:path*'],
}
    import { cookies } from "next/headers";
    import { NextRequest, NextResponse } from "next/server";

    export async function PATCH(req: NextRequest) {
        const cookieStore = await cookies(); // No need to await
        const access = cookieStore.get("access")?.value;

        if (!access) {
            return NextResponse.json({ detail: "Unauthorized" }, { status: 401 });
        }

        try {
            const formData = await req.formData();
            const proxyFormData = new FormData();

            for (const [key, value] of formData.entries()) {
                proxyFormData.append(key, value);
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}profile/`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${access}`,
                    // Do NOT set Content-Type manually for FormData
                },
                body: proxyFormData,
            });

            const data = await response.json();
            return NextResponse.json(data, { status: response.status });
        } catch (err) {
            console.error("Proxy upload failed", err);
            return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        }
    }

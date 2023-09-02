import { NextApiRequest, NextApiResponse } from "next";

export default function middleware(req: NextApiRequest, res: NextApiResponse) {
    const csrfToken = req.cookies.get("csrftoken");

    if (!csrfToken) {
        // Get the CSRF token from the backend.
        const response = await fetch("/api/v1/csrf-token", {
            method: "GET",
        });

        if (response.status === 200) {
            const data = await response.json();
            csrfToken = data.csrf_token;
        } else {
            // Handle the error.
        }
    }

    // Set the CSRF token cookie.
    res.setHeader("X-CSRFToken", csrfToken);
    res.cookie("csrftoken", csrfToken, {
        secure: true,
        httpOnly: true,
        maxAge: 60 * 60,
    });
}
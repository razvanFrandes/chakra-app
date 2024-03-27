import { z } from "zod";

export async function POST(request: Request) {
  const requestSchema = z.object({
    display_name: z.string().optional(),
    nickname: z.string().min(4, { message: "Invalid Username" }),
    email: z.string().email(),
    password: z.string().min(8),
  });

  //const session = await getCsrfToken();
  const data = await request.json();
  // Parse and validate the request body
  const { email, password, nickname } = requestSchema.parse(data);

  const user = await fetch(process.env.WP_API + "/jwt/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_nicename: nickname,
      first_name: nickname,
      display_name: nickname,
      nickname,
      email,
      password,
      AUTH_KEY: process.env.WP_AUTH_KEY,
    }),
  });

  const dataUser = await user.json();
  return Response.json({ dataUser: { success: dataUser.success } });
}

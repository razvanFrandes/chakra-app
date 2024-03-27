import { z } from "zod";

export async function POST(request: Request) {
  const data = await request.json();

  async function resetUser(data: any) {
    data["AUTH_KEY"] = process.env.WP_AUTH_KEY;
    const user = await fetch(
      process.env.WP_API + "/jwt/v1/user/reset_password",
      {
        method: data.code ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const userRes = await user.json();
    console.log(userRes);
    return userRes;
  }

  const dataUser = await resetUser(data);

  return Response.json({ dataUser });
}

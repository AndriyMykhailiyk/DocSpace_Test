export default async function handler(
  req: { method: string; body: { email: string; password: string } },
  res: {
    status: (code: number) => {
      json: (response: { message: string }) => void;
    };
  }
) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (email === "user@example.com" && password === "securepassword123") {
      res.status(200).json({ message: "Реєстрація успішна" });
    } else {
      res.status(400).json({ message: "Невірний email або пароль" });
    }
  } else {
    res.status(405).json({ message: "Метод не підтримується" });
  }
}

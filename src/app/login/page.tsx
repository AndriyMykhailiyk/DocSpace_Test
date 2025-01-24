"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Пароль повинен містити принаймні 8 символів";
    }
    if (!/\d/.test(password)) {
      return "Пароль повинен містити принаймні одну цифру";
    }
    if (!/[A-Z]/.test(password)) {
      return "Пароль повинен містити принаймні одну велику літеру";
    }
    if (!/[a-z]/.test(password)) {
      return "Пароль повинен містити принаймні одну малу літеру";
    }
    return null;
  };

  const handleLogin = () => {
    if (username.length < 3) {
      setError("Логін повинен містити принаймні 3 символи");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (username === "admin" && password === "Password123") {
      router.push("/");
    } else {
      setError("Невірний логін або пароль");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">
          Авторизація
        </h1>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <input
          type="text"
          placeholder="Логін"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-black"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Увійти
        </button>
      </div>
    </div>
  );
}

// app/login/page.tsx
"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CTA_BG = "#2BE58F";
const CTA_HOVER = "#27CC7A";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados de login:", formData);
    router.push("/dashboard");
  };

  return (
    <main className="font-sans min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-8 py-6">
          <Link href="/" className="text-xl font-bold">
            LinkMe<span className="text-[#2BE58F]">Tur</span>
          </Link>
          <Link 
            href="/"
            className="text-gray-600 hover:text-gray-800 transition"
          >
            ← Voltar para home
          </Link>
        </div>
      </header>

      {/* FORMULÁRIO DE LOGIN */}
      <section className="py-16 px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
              LOGIN
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* EMAIL */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                  placeholder="seu@email.com"
                />
              </div>

              {/* SENHA */}
              <div className="mb-6">
                <label htmlFor="senha" className="block text-sm text-gray-700 mb-1">
                  SENHA
                </label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#2BE58F] focus:border-transparent outline-none"
                  placeholder="Sua senha"
                />
              </div>

              {/* Botão Submit */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  backgroundColor: CTA_BG,
                  color: "black",
                  "&:hover": { backgroundColor: CTA_HOVER },
                  py: 1.5,
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Entrar
              </Button>

              <div className="text-center mt-4">
                <Link 
                  href="/cadastro"
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  Não tem conta? Cadastre-se
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
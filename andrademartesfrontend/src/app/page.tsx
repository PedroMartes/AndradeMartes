import Image from "next/image";
import { Cinzel } from "next/font/google";
import Link from "next/link";
import './login.css'


const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400"],
});

export default function LoginPage() {
  return (
    <main className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <Image
            src="/logobranca.png"
            alt="Logo Andrade e Martes Advogados"
            width={254}
            height={230}
            priority
          />
        </div>

        <h1 className={`${cinzel.className} login-title`}>
          ACESSO AO SISTEMA
        </h1>

        <form className="login-form">
          <input
            type="text"
            placeholder="USUÁRIO"
            className={`${cinzel.className} login-input`}
          />

          <input
            type="password"
            placeholder="SENHA"
            className={`${cinzel.className} login-input`}
          />

          <Link href='/logged/inicio'>
            <button
              type="submit"
              className={`${cinzel.className} login-button`}
            >
              ENTRAR
            </button>
          </Link>
        </form>
      </div>
    </main>
  );
}
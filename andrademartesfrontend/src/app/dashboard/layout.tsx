import "./globals.css";
import { Sidebar } from "../../components/sidebar";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'AndradeMartes'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`antialiased`}>
        <div className="sidBar">
          <Sidebar />
        </div>
        <main>
          <div className="mainContainer">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}

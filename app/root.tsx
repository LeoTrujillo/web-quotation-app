import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { QuotationProvider } from "./context/quotation";
import StepProgress from "~/components/StepProgress";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export default function App() {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
        {/* Glassmorphism background circles */}
        <div className="fixed top-[-20%] left-[-20%] w-[600px] h-[600px] rounded-full bg-blue-400 opacity-30 blur-3xl"></div>
        <div className="fixed bottom-[-20%] right-[-20%] w-[600px] h-[600px] rounded-full bg-purple-400 opacity-30 blur-3xl"></div>
        <div className="fixed top-[30%] right-[20%] w-[400px] h-[400px] rounded-full bg-pink-400 opacity-30 blur-3xl"></div>
        
        {/* Content container with glass effect */}
        <div className="relative min-h-screen backdrop-blur-sm">
          <QuotationProvider>
            <main className="container mx-auto px-4 py-8">
              <Outlet />
            </main>
          </QuotationProvider>
          <Scripts />
        </div>
      </body>
    </html>
  );
}

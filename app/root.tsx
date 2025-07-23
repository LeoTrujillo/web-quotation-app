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
      <body className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative font-sans text-base leading-relaxed">
        {/* Glassmorphism background circles - más sutiles */}
        <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-200 opacity-20 blur-3xl"></div>
        <div className="fixed top-[40%] right-[15%] w-[300px] h-[300px] rounded-full bg-slate-200 opacity-15 blur-3xl"></div>
        
        {/* Content container with glass effect */}
        <div className="relative backdrop-blur-sm">
          <QuotationProvider>
            <Outlet />
          </QuotationProvider>
          <Scripts />
        </div>
      </body>
    </html>
  );
}

import { createRoot } from "react-dom/client"
import "./shared/styles/index.css"
import { App } from "./app/App.tsx"
import { Providers } from "@/app/providers"

createRoot(document.getElementById("root")!).render(
  <Providers>
    <App/>
  </Providers>,
)

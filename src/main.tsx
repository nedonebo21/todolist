import { createRoot } from "react-dom/client"
import "./shared/styles/index.css"
// import { App } from "./app/App.tsx"
import { Providers } from "@/app/providers"
import {AppWithHttpRequest} from "@/app/app-with-http-request.tsx";

createRoot(document.getElementById("root")!).render(
  <Providers>
    {/*<App />*/}
    <AppWithHttpRequest/>
  </Providers>,
)

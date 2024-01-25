

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./lib/context/Authcontext";
import { Queryprovider } from "./lib/reactquery/Queryprovider";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Queryprovider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </Queryprovider>
    </BrowserRouter>

)
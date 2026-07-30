
import "./globals.css";import {Toaster} from "sonner";
export const metadata={title:{default:"Powerchain Portal Beta",template:"%s | Powerchain"},description:"Role-based enterprise operations for renewable infrastructure."};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}<Toaster richColors position="top-right"/></body></html>}

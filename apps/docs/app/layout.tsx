
import "./globals.css";
import {DocsHeader} from "@/components/header";
import {DocsSidebar} from "@/components/sidebar";
import {DocsFooter} from "@/components/footer";

export default function Layout({children}:{children:React.ReactNode}){
  return <html lang="en"><body><DocsHeader/><div className="grid lg:grid-cols-[250px_1fr]"><DocsSidebar/><div><main className="mx-auto min-h-[calc(100vh-8rem)] max-w-[1400px] p-5 md:p-8">{children}</main><DocsFooter/></div></div></body></html>;
}

import Link from "next/link";
export function OperationCard({title,description,href}:{title:string;description:string;href:string}){return <article style={{border:"1px solid #d8e4dc",borderRadius:16,padding:24}}><h2>{title}</h2><p>{description}</p><Link href={href}>Open {title} →</Link></article>}

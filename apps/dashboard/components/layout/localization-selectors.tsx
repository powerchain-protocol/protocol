
"use client";
import {useState} from "react";
export function LocalizationSelectors(){
 const [currency,setCurrency]=useState("USD");const [locale,setLocale]=useState("en-US");
 return <div className="flex gap-2"><select aria-label="Currency" value={currency} onChange={e=>setCurrency(e.target.value)} className="h-9 rounded-lg border bg-white px-2 text-xs"><option>USD</option><option>EUR</option><option>GBP</option></select><select aria-label="Language and locale" value={locale} onChange={e=>setLocale(e.target.value)} className="h-9 rounded-lg border bg-white px-2 text-xs"><option value="en-US">English (US)</option><option value="en-GB">English (UK)</option><option value="fi-FI">Suomi</option></select></div>
}


import {env} from "@/env";
const allowed=["application/pdf","text/csv","application/json","image/png","image/jpeg","image/webp"];
export function validateUpload(file:File){if(file.size>env.uploadMaxBytes)throw new Error("File too large");if(!allowed.includes(file.type))throw new Error("Unsupported file type");return file}
export async function uploadFile(file:File){validateUpload(file);const body=new FormData();body.append("file",file);const response=await fetch(`${env.apiUrl}/uploads`,{method:"POST",body});if(!response.ok)throw new Error("Upload failed");return response.json()}

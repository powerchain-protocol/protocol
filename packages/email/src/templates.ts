
function layout(title:string,body:string){
  return `<!doctype html><html><body style="margin:0;background:#f4f8f5;font-family:Arial,sans-serif;color:#10231a"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px"><table role="presentation" width="600" style="max-width:100%;background:#fff;border-radius:20px;padding:32px"><tr><td><p style="font-size:12px;font-weight:700;letter-spacing:2px;color:#087a3b">POWERCHAIN</p><h1 style="font-size:28px">${title}</h1>${body}<p style="margin-top:32px;font-size:12px;color:#64748b">Powerchain · Intelligent energy infrastructure</p></td></tr></table></td></tr></table></body></html>`;
}

export function welcomeEmail(input:{name:string;organization:string}){
  return {
    subject:"Welcome to Powerchain",
    html:layout("Your Powerchain workspace is ready",`<p>Hello ${input.name},</p><p>Your ${input.organization} workspace has been created. Complete security setup and invite your team from the dashboard.</p><p><a href="https://dashboard.powerchain.energy" style="display:inline-block;background:#087a3b;color:#fff;padding:12px 18px;border-radius:10px;text-decoration:none">Open dashboard</a></p>`),
    text:`Hello ${input.name}, your ${input.organization} Powerchain workspace is ready.`
  };
}

export function accessChangedEmail(input:{name:string;role:string;organization:string}){
  return {
    subject:"Your Powerchain access changed",
    html:layout("Access updated",`<p>Hello ${input.name},</p><p>Your role for ${input.organization} is now <strong>${input.role}</strong>.</p>`),
    text:`Your role for ${input.organization} is now ${input.role}.`
  };
}

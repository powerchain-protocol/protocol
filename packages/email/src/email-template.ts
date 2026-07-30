
type EmailTemplateOptions = {
  heading: string;
  preview: string;
  body: string;
  actionLabel?: string;
  actionUrl?: string;
};

export function renderEmailTemplate(options: EmailTemplateOptions) {
  const action = options.actionLabel && options.actionUrl
    ? `<a href="${options.actionUrl}" style="display:inline-block;padding:12px 18px;background:#087a3b;color:#fff;text-decoration:none;border-radius:10px;font-weight:700">${options.actionLabel}</a>`
    : "";

  return `<!doctype html>
<html lang="en">
<body style="margin:0;background:#f5f8f5;font-family:Arial,sans-serif;color:#102018">
  <div style="display:none;max-height:0;overflow:hidden">${options.preview}</div>
  <main style="max-width:620px;margin:32px auto;background:#fff;border:1px solid #dce7df;border-radius:18px;padding:32px">
    <div style="font-weight:800;color:#087a3b">POWERCHAIN</div>
    <h1 style="font-size:30px;line-height:1.15">${options.heading}</h1>
    <p style="font-size:16px;line-height:1.7;color:#55645b">${options.body}</p>
    ${action}
  </main>
</body>
</html>`;
}

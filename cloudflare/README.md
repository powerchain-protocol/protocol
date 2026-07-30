
# Cloudflare edge configuration

The Worker applies API rate limiting and security headers before forwarding requests to `api.powerchain.energy`.

Login and payment routes should also use Cloudflare WAF rate-limiting rules. Do not cache responses that set authentication cookies or contain user-specific data.

# Quick Start: Get TACo Online with Your Domain

Two steps to get your TACo website online:

## 1. Get GitHub Collaboration Access
- Send your GitHub username to @saschakrischock/@saschasan
- Accept the collaboration invite from GitHub
- You now have access to https://github.com/saschakrischock/TACo

## 2. Connect Your Domain via Netlify
- Go to [netlify.com](https://netlify.com)
- Sign up with GitHub
- Click "Add new site" → "Import an existing project"
- Select the TACo repository
- Use these settings:
  ```
  Build command: npm run build
  Publish directory: dist
  Node version: 22.x
  ```
- Click "Deploy site"
- Go to Site settings → Domain management
- Click "Add custom domain"
- Enter your domain
- Login to your domain provider, add these DNS records:
  ```
  Type: A
  Name: @ or your subdomain
  Value: Netlify's load balancer IP (shown in Netlify)
     
  Type: CNAME
  Name: www
  Value: your-netlify-site-name.netlify.app
  ```
- Wait for DNS changes (can take up to 24 hours)
- HTTPS will be set up automatically

That's it! You now have access to TACo's GitHub repository and your site is deployed through Netlify. Any updates made to TACo will automatically appear on your site.
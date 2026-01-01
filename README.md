# Musik Cafe Dashboard

A beautiful, modern Discord bot dashboard for managing Musik Cafe music bot settings across multiple servers.

## Features

- 🎨 Beautiful aqua/dark blue/black theme
- 🔐 Discord OAuth2 authentication
- 📊 Server management dashboard
- ⚙️ Advanced bot configuration
- 📱 Responsive design
- 🚀 Fast & lightweight (Next.js)
- 💾 Easy deployment to Vercel

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS
- **Deployment**: Vercel (free)
- **Authentication**: Discord OAuth2

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Discord Developer Application created
- GitHub account
- Vercel account (free)

### 1. Get Discord OAuth2 Credentials

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to OAuth2 → General
4. Copy your **Client ID**
5. Add Redirect URI: `https://musik-cafe.site/auth/callback`
6. Copy your **Client Secret**

### 2. Environment Variables

Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_DISCORD_CLIENT_ID=YOUR_CLIENT_ID_HERE
DISCORD_CLIENT_SECRET=YOUR_CLIENT_SECRET_HERE
NEXT_PUBLIC_DISCORD_REDIRECT_URI=https://musik-cafe.site/auth/callback
NEXT_PUBLIC_BOT_API_URL=http://217.154.212.66:10340
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Development

```bash
npm run dev
```

Then open `http://localhost:3000`

### 5. Deploy to Vercel

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_DISCORD_CLIENT_ID`
   - `DISCORD_CLIENT_SECRET`
   - `NEXT_PUBLIC_DISCORD_REDIRECT_URI`
   - `NEXT_PUBLIC_BOT_API_URL`
6. Click Deploy

### 6. Configure Domain (Namecheap)

1. Log in to Namecheap
2. Go to your domain settings
3. Click "Advanced DNS"
4. Add CNAME record:
   - **Host**: @ (or www)
   - **Type**: CNAME
   - **Value**: cname.vercel.com
   - **TTL**: 3600
5. Wait 5-15 minutes for DNS propagation

Then in Vercel:
1. Project Settings → Domains
2. Add Domain: `musik-cafe.site`
3. Follow instructions to verify

## Pages

- `/` - Home page
- `/login` - Discord OAuth2 login
- `/dashboard` - Main dashboard
- `/servers` - Your authorized servers
- `/[serverId]/config` - Server configuration
- `/add` - Add bot to server
- `/documentation` - Full command documentation

## Bot Configuration

Users can configure:
- 🔊 Default volume
- 🔤 Command prefix
- 🎭 DJ roles
- 📝 Music channels
- ⏱️ Auto-leave settings

## Social Links

The dashboard includes links to:
- Discord: https://discord.gg/d8uuYBf7Nh
- YouTube: https://www.youtube.com/channel/UCRSv_s1Qppxt68oKoLeReng?sub_confirmation=1

These are displayed in the footer of every page.

## Support

For issues or questions, join our Discord server or check the documentation page.

## License

Made with ❤️ by Bunirx

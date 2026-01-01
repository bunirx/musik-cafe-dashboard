// Configuration for Discord OAuth2
// Get these from Discord Developer Portal: https://discord.com/developers/applications

export const DISCORD_CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || '';
export const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || '';
export const DISCORD_REDIRECT_URI = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI || 'https://www.musik-cafe.site/auth/callback';

// Bot API configuration
export const BOT_API_URL = process.env.NEXT_PUBLIC_BOT_API_URL || 'http://217.154.212.66:10340';

// Social Links
export const SOCIAL_LINKS = {
  discord: 'https://discord.gg/d8uuYBf7Nh',
  youtube: 'https://www.youtube.com/channel/UCRSv_s1Qppxt68oKoLeReng?sub_confirmation=1',
};

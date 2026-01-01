import type { NextApiRequest, NextApiResponse } from 'next';
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI } from '@/config';

type ResponseData = {
  success?: boolean;
  error?: string;
  token?: string;
  user?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        code: code as string,
        grant_type: 'authorization_code',
        redirect_uri: DISCORD_REDIRECT_URI,
      }).toString(),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.json();
      console.error('Discord token error:', error);
      return res.status(400).json({ error: 'Failed to get token from Discord' });
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Get user info
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      return res.status(400).json({ error: 'Failed to get user info' });
    }

    const user = await userResponse.json();

    // Get user guilds
    const guildsResponse = await fetch('https://discord.com/api/users/@me/guilds', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!guildsResponse.ok) {
      return res.status(400).json({ error: 'Failed to get guilds' });
    }

    const guilds = await guildsResponse.json();

    // Filter guilds where user is owner or has admin permissions
    const adminGuilds = guilds.filter((guild: any) => {
      const ADMINISTRATOR = 0x8; // Discord permission bit for administrator
      return guild.owner || (guild.permissions & ADMINISTRATOR) === ADMINISTRATOR;
    });

    // Return success with token and user data
    return res.status(200).json({
      success: true,
      token: accessToken,
      user: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        email: user.email,
        guilds: adminGuilds,
      },
    });
  } catch (error) {
    console.error('OAuth error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

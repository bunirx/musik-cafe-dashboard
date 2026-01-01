import type { NextApiRequest, NextApiResponse } from 'next';
import { BOT_API_URL } from '@/config';

type ResponseData = {
  success?: boolean;
  error?: string;
  config?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { serverId } = req.query;

  if (!serverId || typeof serverId !== 'string') {
    return res.status(400).json({ error: 'Invalid server ID' });
  }

  try {
    if (req.method === 'GET') {
      // Fetch config from bot API
      const response = await fetch(`${BOT_API_URL}/config/${serverId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // If 404, return default config
        if (response.status === 404) {
          return res.status(200).json({
            success: true,
            config: {
              defaultVolume: 100,
              defaultPrefix: '.',
              djRoles: [],
              musicChannels: [],
              voiceChannels: [],
            },
          });
        }
        return res.status(response.status).json({ error: 'Failed to fetch config from bot' });
      }

      const config = await response.json();
      return res.status(200).json({ success: true, config });
    } else if (req.method === 'POST') {
      // Save config to bot API
      const { defaultVolume, defaultPrefix, djRoles, musicChannels, voiceChannels } = req.body;

      // Validate prefix length
      if (!defaultPrefix || defaultPrefix.length > 5) {
        return res.status(400).json({ error: 'Prefix must be 1-5 characters' });
      }

      const response = await fetch(`${BOT_API_URL}/config/${serverId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          default_volume: defaultVolume,
          default_prefix: defaultPrefix,
          dj_roles: djRoles || [],
          music_channels: musicChannels || [],
          voice_channels: voiceChannels || [],
        }),
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to save config to bot' });
      }

      const savedConfig = await response.json();
      return res.status(200).json({ success: true, config: savedConfig });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Config API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

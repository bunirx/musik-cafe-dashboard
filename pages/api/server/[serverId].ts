import type { NextApiRequest, NextApiResponse } from 'next';
import { BOT_API_URL } from '@/config';

type ResponseData = {
  success?: boolean;
  error?: string;
  channels?: any[];
  roles?: any[];
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
    const response = await fetch(`${BOT_API_URL}/server/${serverId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch server data from bot' });
    }

    const data = await response.json();
    return res.status(200).json({
      success: true,
      channels: data.channels || [],
      roles: data.roles || [],
    });
  } catch (error) {
    console.error('Server data API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

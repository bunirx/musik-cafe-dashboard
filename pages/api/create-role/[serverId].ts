import type { NextApiRequest, NextApiResponse } from 'next';
import { BOT_API_URL } from '@/config';

type ResponseData = {
  success?: boolean;
  error?: string;
  role?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { serverId } = req.query;
  const { name } = req.body;

  if (!serverId || typeof serverId !== 'string') {
    return res.status(400).json({ error: 'Invalid server ID' });
  }

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Invalid role name' });
  }

  try {
    const response = await fetch(`${BOT_API_URL}/create-role/${serverId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.trim(),
      }),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to create role on bot' });
    }

    const role = await response.json();
    return res.status(200).json({ success: true, role });
  } catch (error) {
    console.error('Create role API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

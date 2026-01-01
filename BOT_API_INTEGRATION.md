# Bot API Integration Guide

This document outlines the API endpoints that your bot needs to implement for the dashboard to work properly.

## Required Bot API Endpoints

### 1. Get Server Configuration
**Endpoint:** `GET /config/{serverId}`

**Response (200 OK):**
```json
{
  "default_volume": 100,
  "default_prefix": ".",
  "dj_roles": ["roleId1", "roleId2"],
  "music_channels": ["channelId1"],
  "voice_channels": ["voiceChannelId1"]
}
```

**Response (404 Not Found):**
Returns 404 if no config exists for this server - the dashboard will use defaults.

---

### 2. Save Server Configuration
**Endpoint:** `POST /config/{serverId}`

**Request Body:**
```json
{
  "default_volume": 100,
  "default_prefix": ".",
  "dj_roles": ["roleId1", "roleId2"],
  "music_channels": ["channelId1"],
  "voice_channels": ["voiceChannelId1"]
}
```

**Response (200 OK):**
```json
{
  "default_volume": 100,
  "default_prefix": ".",
  "dj_roles": ["roleId1", "roleId2"],
  "music_channels": ["channelId1"],
  "voice_channels": ["voiceChannelId1"]
}
```

---

### 3. Get Server Data (Channels & Roles)
**Endpoint:** `GET /server/{serverId}`

**Response (200 OK):**
```json
{
  "channels": [
    {
      "id": "123456789",
      "name": "general",
      "type": "text"
    },
    {
      "id": "987654321",
      "name": "Voice Channel",
      "type": "voice"
    }
  ],
  "roles": [
    {
      "id": "roleId1",
      "name": "DJ"
    },
    {
      "id": "roleId2",
      "name": "Moderator"
    }
  ]
}
```

---

### 4. Create DJ Role
**Endpoint:** `POST /create-role/{serverId}`

**Request Body:**
```json
{
  "name": "DJ"
}
```

**Response (200 OK):**
```json
{
  "id": "newRoleId",
  "name": "DJ"
}
```

---

## Implementation Notes

1. **Base URL:** Your bot API is at `http://217.154.212.66:10340`
2. **Data Storage:** Configs should be persisted to your `server_config.json` file
3. **Channel Types:** Must be either "text" or "voice"
4. **Role Creation:** Should create a Discord role in the specified server with the given name
5. **Default Config:** If no config exists, return 404 and the dashboard will use defaults

## Example Implementation (Python/Flask)

```python
from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)
CONFIG_FILE = 'server_config.json'

@app.route('/config/<server_id>', methods=['GET', 'POST'])
def config(server_id):
    if request.method == 'GET':
        with open(CONFIG_FILE, 'r') as f:
            configs = json.load(f)
        if server_id not in configs:
            return {'error': 'Not found'}, 404
        return jsonify(configs[server_id]), 200
    
    elif request.method == 'POST':
        data = request.json
        with open(CONFIG_FILE, 'r') as f:
            configs = json.load(f)
        configs[server_id] = data
        with open(CONFIG_FILE, 'w') as f:
            json.dump(configs, f, indent=2)
        return jsonify(data), 200

@app.route('/server/<server_id>', methods=['GET'])
def server_data(server_id):
    # Get guild object from Discord bot
    guild = bot.get_guild(int(server_id))
    return jsonify({
        'channels': [
            {'id': str(c.id), 'name': c.name, 'type': 'voice' if isinstance(c, discord.VoiceChannel) else 'text'}
            for c in guild.channels
            if isinstance(c, (discord.TextChannel, discord.VoiceChannel))
        ],
        'roles': [
            {'id': str(r.id), 'name': r.name}
            for r in guild.roles
            if r.name != '@everyone'
        ]
    }), 200

@app.route('/create-role/<server_id>', methods=['POST'])
def create_role(server_id):
    data = request.json
    guild = bot.get_guild(int(server_id))
    role = await guild.create_role(name=data['name'])
    return jsonify({'id': str(role.id), 'name': role.name}), 200
```

---

## Testing

You can test these endpoints with curl:

```bash
# Get config
curl http://217.154.212.66:10340/config/123456789

# Save config
curl -X POST http://217.154.212.66:10340/config/123456789 \
  -H "Content-Type: application/json" \
  -d '{"default_volume": 100, "default_prefix": "."}'

# Get server data
curl http://217.154.212.66:10340/server/123456789

# Create role
curl -X POST http://217.154.212.66:10340/create-role/123456789 \
  -H "Content-Type: application/json" \
  -d '{"name": "DJ"}'
```

# Discord Bot TypeScript

A professional multipurpose Discord moderation bot template written in TypeScript using discord.js v14.

---

## Features

- Modular command handler with slash commands  
- Moderation commands: ban, kick, mute, clear messages  
- Utility commands: user info, server info, help command with interactive button pagination  
- Clean project structure for easy extension and maintenance  
- Event-driven architecture with ready and interaction handling  
- Written fully in TypeScript for type safety and easier development  

---

## Setup

### Prerequisites

- rename .env.example to .env
- Node.js and npm installed  
- Discord bot token from the Discord Developer Portal  
- Basic TypeScript knowledge  

### Installation

1. Clone this repository or copy files into your project folder.  
2. Create a `.env` file in project root containing your bot token:  
TOKEN=your-bot-token-here

text
3. Install dependencies:  
npm install

text
4. Register slash commands with Discord (see discord.js guide or use provided command registration script if available).  
5. Start the bot in development mode:  
npm run dev

text
6. Your bot should come online and be ready to accept slash commands in your server.

---

## Commands Examples

- `/ban @user [reason]` - bans a user with optional reason  
- `/kick @user [reason]` - kicks a user  
- `/mute @user minutes` - timeouts a user for specified minutes  
- `/clear amount` - bulk deletes messages  
- `/user` - shows your user info  
- `/server` - shows information about the current server  
- `/help` - opens paginated help menu with commands overview  

---

## Project Structure

src/
├── commands/ # Command files
├── events/ # Event handlers (ready, interactionCreate)
├── utils/ # Command loader and utilities
└── index.ts # Bot entrypoint
.env # Bot token
tsconfig.json # TypeScript config
package.json # Dependencies and scripts

text

---

## Extending

- Add new commands in `src/commands` folder  
- Register new events in `src/events`  
- Use the existing structure and types for consistency  
- Add persistent storage or logging as needed  

---

## License

MIT License, see `LICENSE`

---

## Author

Arpan - [GitHub](https://github.com/arpancodez)

// Add your bot token
const DISCORD_BOT_TOKEN = GetConvar("discord_bot_token", "default_toke_if_not_set")
// Setup the intents, in this case Guilds and Guild Users
const INTENTS_BITFIELD = parseInt(GetConvar("discord_intents", "3")); 

let client;
let discordReady = false;

// function to start the Discord Gateway connection
async function connectToDiscordGateway() {
    try {
        console.log('Connecting to Discord Gateway with discord.js v13...');
        
        client = new Client({
            intents: [
                INTENTS_BITFIELD
            ]
        });

        client.on('ready', () => {
            console.log(`Discord Bot ready! Logged in as ${client.user.tag}`);
            discordReady = true;
            emit('discordReady', client.user.id);
            // Set bot activity
            client.user.setActivity('FiveM Server', { type: 'PLAYING' });
        });

        client.on('guildMemberUpdate', async (oldMember, newMember) => {
            console.log(`Discord member old roles: ${oldMember.roles.cache.map(role => role.name).join(', ')}`);
            console.log(`Discord member new roles: ${newMember.roles.cache.map(role => role.name).join(', ')}`);
        });

        client.on('error', error => {
            console.error('Discord Client Error:', error);
            discordReady = false;
        });

        client.on('warn', info => {
            console.warn('Discord Client Warning:', info)
        });

        await client.login(DISCORD_BOT_TOKEN);
    } catch(error) {
        console.error('Failed to connect to Discord Gateway:', error);
        // Implement retry logic or alert system
    }
}

on("onResourceStart", (resourceName) => {
    if(GetCurrentResourceName() === resourceName) {
        connectToDiscordGateway();
    }
});

// Cleanup on resource stop
on("onResourceStop", (resourceName) => {
    if(GetCurrentResourceName() == resourceName) {
        if (client) {
            console.log('Disconnecting from Discord Gateway...');
            client.destroy();
        }
    }
});

// Import the necessary modules
const { Client, Intents } = require('discord.js');
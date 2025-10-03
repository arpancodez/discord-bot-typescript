// src/events/guildMemberAdd.ts
import { Events } from "discord.js";

export default {
  name: Events.GuildMemberAdd,
  async execute(member: any) {
    const channelId = "CHANNEL_ID"; // replace with your welcome channel of discord
    const roleId = "AUTOROLEID"; // replace with default role of discord server

    const channel = member.guild.channels.cache.get(channelId);
    if (channel) channel.send(`👋 Welcome ${member}!`); // you can customize your welcome msg

    const role = member.guild.roles.cache.get(roleId);
    if (role) await member.roles.add(role);
  },
};

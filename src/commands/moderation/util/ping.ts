// src/commands/util/ping.ts
import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check bot latency"),
  async execute(interaction: any) {
    const sent = await interaction.reply({ content: "Pinging...", fetchReply: true });
    interaction.editReply(
      `🏓 Latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms | API: ${interaction.client.ws.ping}ms`
    );
  },
};

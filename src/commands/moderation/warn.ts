// src/commands/moderation/warn.ts
import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warn a member with a reason.")
    .addUserOption(option =>
      option.setName("target")
        .setDescription("The member to warn")
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName("reason")
        .setDescription("Reason for the warning")
        .setRequired(false)
    ),

  async execute(interaction: any) {
    const target = interaction.options.getUser("target");
    const reason = interaction.options.getString("reason") || "No reason provided";

    // Check if a user is trying to warn themselves
    if (target.id === interaction.user.id) {
      return interaction.reply({ content: "You cannot warn yourself!", ephemeral: true });
    }

    await interaction.reply({
      content: `⚠️ ${target} has been warned.\n**Reason:** ${reason}`
    });

    // You could log this to a moderation log channel instead
    const logChannel = interaction.guild.channels.cache.find((ch: any) => ch.name === "mod-logs");
    if (logChannel) {
      (logChannel as any).send(`⚠️ ${target.tag} was warned by ${interaction.user.tag}. Reason: ${reason}`);
    }
  }
};

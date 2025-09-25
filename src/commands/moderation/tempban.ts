// src/commands/moderation/tempban.ts
import { SlashCommandBuilder, PermissionsBitField } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("tempban")
    .setDescription("Ban a member temporarily.")
    .addUserOption(option =>
      option.setName("target")
        .setDescription("The member to ban")
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName("duration")
        .setDescription("Duration in minutes")
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName("reason")
        .setDescription("Reason for the ban")
    ),

  async execute(interaction: any) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return interaction.reply({ content: "You lack permission to ban members.", ephemeral: true });
    }

    const target = interaction.options.getUser("target");
    const duration = interaction.options.getInteger("duration");
    const reason = interaction.options.getString("reason") || "No reason provided";

    try {
      await interaction.guild.members.ban(target, { reason });
      await interaction.reply(`⛔ ${target.tag} has been banned for **${duration} minutes**. Reason: ${reason}`);

      // Unban after X minutes
      setTimeout(async () => {
        await interaction.guild.members.unban(target.id, "Tempban expired");
      }, duration * 60 * 1000);
    } catch (err) {
      interaction.reply({ content: "Failed to ban member.", ephemeral: true });
    }
  }
};

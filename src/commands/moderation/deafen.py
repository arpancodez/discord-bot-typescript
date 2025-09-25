// src/commands/moderation/deafen.ts
import { SlashCommandBuilder, PermissionsBitField } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("deafen")
    .setDescription("Server deafen a member in voice chat.")
    .addUserOption(option =>
      option.setName("target")
        .setDescription("The member to deafen")
        .setRequired(true)
    ),

  async execute(interaction: any) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.DeafenMembers)) {
      return interaction.reply({ content: "You lack permission to deafen members.", ephemeral: true });
    }

    const member = interaction.options.getMember("target");

    if (!member.voice.channel) {
      return interaction.reply({ content: "That member is not in a voice channel.", ephemeral: true });
    }

    await member.voice.setDeaf(true);
    interaction.reply(`🔇 ${member.user.tag} has been deafened in voice.`);
  }
};

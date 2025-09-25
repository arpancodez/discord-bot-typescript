// src/commands/moderation/undeafen.ts
import { SlashCommandBuilder, PermissionsBitField } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("undeafen")
    .setDescription("Remove server deafen from a member.")
    .addUserOption(option =>
      option.setName("target")
        .setDescription("The member to undeafen")
        .setRequired(true)
    ),

  async execute(interaction: any) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.DeafenMembers)) {
      return interaction.reply({ content: "You lack permission to undeafen members.", ephemeral: true });
    }

    const member = interaction.options.getMember("target");

    if (!member.voice.channel) {
      return interaction.reply({ content: "That member is not in a voice channel.", ephemeral: true });
    }

    await member.voice.setDeaf(false);
    interaction.reply(`🔊 ${member.user.tag} has been undeafened.`);
  }
};

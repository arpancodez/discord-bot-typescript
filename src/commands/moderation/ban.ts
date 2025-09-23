import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user.")
    .addUserOption(o => o.setName("target").setDescription("User to ban").setRequired(true))
    .addStringOption(o => o.setName("reason").setDescription("Reason").setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("target", true);
    const member = interaction.guild!.members.cache.get(user.id);
    if (!member) return interaction.reply("Member not found.");
    await member.ban({
      reason: interaction.options.getString("reason") || undefined
    });
    await interaction.reply(`Banned ${user.tag}`);
  }
};
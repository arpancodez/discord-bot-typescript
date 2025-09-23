import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a user.")
    .addUserOption(o => o.setName("target").setDescription("User to kick").setRequired(true))
    .addStringOption(o => o.setName("reason").setDescription("Reason").setRequired(false))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("target", true);
    const member = interaction.guild!.members.cache.get(user.id);
    if (!member) return interaction.reply("Member not found.");
    await member.kick(interaction.options.getString("reason") || undefined);
    await interaction.reply(`Kicked ${user.tag}`);
  }
};
import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Info about this server."),
  async execute(interaction: ChatInputCommandInteraction) {
    const guild = interaction.guild;
    const embed = new EmbedBuilder()
      .setTitle(guild?.name || "Unknown")
      .addFields(
        { name: "Members", value: `${guild?.memberCount}`, inline: true },
        { name: "Created", value: `<t:${Math.floor(guild!.createdTimestamp / 1000)}:R>`, inline: true }
      );
    await interaction.reply({ embeds: [embed] });
  }
};

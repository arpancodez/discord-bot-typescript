import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Info about yourself."),
  async execute(interaction: ChatInputCommandInteraction) {
    const user = interaction.user;
    const member = interaction.guild?.members.cache.get(user.id);
    const embed = new EmbedBuilder()
      .setTitle(user.tag)
      .setThumbnail(user.displayAvatarURL())
      .addFields(
        { name: "ID", value: user.id },
        { name: "Joined", value: member ? `<t:${Math.floor(member.joinedTimestamp! / 1000)}:R>` : "N/A" }
      );
    await interaction.reply({ embeds: [embed] });
  }
};

// src/commands/util/serverinfo.ts
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Show info about this server"),
  async execute(interaction: any) {
    const { guild } = interaction;
    const embed = new EmbedBuilder()
      .setTitle(`${guild.name}`)
      .setThumbnail(guild.iconURL() || "")
      .addFields(
        { name: "Owner", value: `<@${guild.ownerId}>` },
        { name: "Members", value: `${guild.memberCount}` },
        { name: "Created", value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>` }
      )
      .setColor("Green");
    interaction.reply({ embeds: [embed] });
  },
};

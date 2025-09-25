// src/commands/util/userinfo.ts
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Show info about a user")
    .addUserOption(opt =>
      opt.setName("user").setDescription("User to get info on").setRequired(false)
    ),
  async execute(interaction: any) {
    const member = interaction.options.getMember("user") || interaction.member;
    const embed = new EmbedBuilder()
      .setTitle(`${member.user.tag}`)
      .setThumbnail(member.user.displayAvatarURL())
      .addFields(
        { name: "ID", value: member.id },
        { name: "Joined", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>` },
        { name: "Roles", value: member.roles.cache.map((r: any) => r).join(", ") }
      )
      .setColor("Blue");
    interaction.reply({ embeds: [embed] });
  },
};

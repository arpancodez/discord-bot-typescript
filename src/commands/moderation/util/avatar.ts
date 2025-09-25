// src/commands/util/avatar.ts
import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Show a user's avatar")
    .addUserOption(opt =>
      opt.setName("user").setDescription("User to get avatar").setRequired(false)
    ),
  async execute(interaction: any) {
    const user = interaction.options.getUser("user") || interaction.user;
    interaction.reply(user.displayAvatarURL({ size: 4096, extension: "png" }));
  },
};

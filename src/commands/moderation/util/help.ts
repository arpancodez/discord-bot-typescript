import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} from "discord.js";

const pages = [
  new EmbedBuilder()
    .setTitle("Moderation Commands")
    .setDescription("`/ban`, `/kick`, `/mute`, `/clear`"),
  new EmbedBuilder()
    .setTitle("Utility & Info Commands")
    .setDescription("`/user`, `/server`, `/help`")
];

export default {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Show all bot commands!"),
  async execute(interaction: ChatInputCommandInteraction) {
    let page = 0;
    const components = [
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setCustomId("prev")
          .setLabel("Previous")
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId("next")
          .setLabel("Next")
          .setStyle(ButtonStyle.Primary)
      )
    ];
    const msg = await interaction.reply({
      embeds: [pages[page]],
      components,
      fetchReply: true
    });

    const filter = (i: any) => i.user.id === interaction.user.id;
    const collector = (msg as any).createMessageComponentCollector({ filter, time: 60000 });

    collector.on("collect", async (i: any) => {
      if (i.customId === "next" && page < pages.length - 1) page++;
      else if (i.customId === "prev" && page > 0) page--;
      await i.update({
        embeds: [pages[page]],
        components: [
          new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
              .setCustomId("prev")
              .setLabel("Previous")
              .setStyle(ButtonStyle.Secondary)
              .setDisabled(page === 0),
            new ButtonBuilder()
              .setCustomId("next")
              .setLabel("Next")
              .setStyle(ButtonStyle.Primary)
              .setDisabled(page === pages.length - 1)
          )
        ]
      });
    });
  }
};

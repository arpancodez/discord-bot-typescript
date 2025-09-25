import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("eval")
    .setDescription("Evaluate TypeScript/JavaScript code (bot owner only).")
    .addStringOption(option =>
      option.setName("code")
        .setDescription("The code to evaluate")
        .setRequired(true)
    ),

  async execute(interaction: any) {
    const ownerId = "YOUR_DISCORD_ID"; // replace with your Discord user ID

    if (interaction.user.id !== ownerId) {
      return interaction.reply({
        content: "❌ You don’t have permission to use this command.",
        ephemeral: true,
      });
    }

    const code = interaction.options.getString("code", true);

    try {
      // Run the code
      let result = eval(code);

      // Await if it’s a promise
      if (result instanceof Promise) {
        result = await result;
      }

      // Convert objects to JSON string
      if (typeof result === "object") {
        result = JSON.stringify(result, null, 2);
      }

      // Send result

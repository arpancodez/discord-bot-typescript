// vckick.ts
import { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('vckick')
    .setDescription('Kick a user from their voice channel')
    .addUserOption(option =>
        option.setName('target')
            .setDescription('User to disconnect from voice channel')
            .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.MoveMembers);

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const member = interaction.options.getMember('target');

    if (!member) {
        await interaction.reply({ content: 'Member not found.', ephemeral: true });
        return;
    }

    if (!member.voice.channel) {
        await interaction.reply({ content: 'User is not in a voice channel.', ephemeral: true });
        return;
    }

    try {
        await member.voice.disconnect();
        await interaction.reply({ content: `✅ ${member.user.tag} has been disconnected from their voice channel.` });
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ Failed to disconnect the user.', ephemeral: true });
    }
};

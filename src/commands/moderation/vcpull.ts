// vcpull.ts
import { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('vcpull')
    .setDescription('Pull a user into your voice channel')
    .addUserOption(option =>
        option.setName('target')
            .setDescription('User to move to your voice channel')
            .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.MoveMembers);

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const member = interaction.options.getMember('target');
    const authorVoiceChannel = interaction.member?.voice.channel;

    if (!authorVoiceChannel) {
        await interaction.reply({ content: 'You are not in a voice channel.', ephemeral: true });
        return;
    }

    if (!member) {
        await interaction.reply({ content: 'Member not found.', ephemeral: true });
        return;
    }

    if (!member.voice.channel) {
        await interaction.reply({ content: 'User is not in a voice channel.', ephemeral: true });
        return;
    }

    try {
        await member.voice.setChannel(authorVoiceChannel);
        await interaction.reply({ content: `✅ ${member.user.tag} has been pulled into your voice channel.` });
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ Failed to move the user.', ephemeral: true });
    }
};

// vcunban.ts
import { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, GuildMember, VoiceChannel } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('vcunban')
    .setDescription('Unban a user from all voice channels')
    .addUserOption(option =>
        option.setName('target')
            .setDescription('User to remove VC ban from')
            .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels | PermissionFlagsBits.MoveMembers);

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const member = interaction.options.getMember('target') as GuildMember;

    if (!member) {
        await interaction.reply({ content: 'Member not found.', ephemeral: true });
        return;
    }

    try {
        const voiceChannels = interaction.guild?.channels.cache.filter(c => c.isVoiceBased()) as Map<string, VoiceChannel>;
        if (!voiceChannels) return;

        for (const [, channel] of voiceChannels) {
            // Reset Connect permission for this member
            await channel.permissionOverwrites.edit(member, {
                Connect: null
            });
        }

        await interaction.reply({ content: `✅ ${member.user.tag} is now unbanned from all voice channels.` });
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ Failed to remove VC ban.', ephemeral: true });
    }
};

// vcban.ts
import { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, GuildMember, VoiceChannel } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('vcban')
    .setDescription('Ban a user from all voice channels')
    .addUserOption(option =>
        option.setName('target')
            .setDescription('User to VC ban')
            .setRequired(true)
    )
    .setStringOption(option =>
        option.setName('reason')
            .setDescription('Reason for VC ban')
            .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels | PermissionFlagsBits.MoveMembers);

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const member = interaction.options.getMember('target') as GuildMember;
    const reason = interaction.options.getString('reason') || 'No reason provided';

    if (!member) {
        await interaction.reply({ content: 'Member not found.', ephemeral: true });
        return;
    }

    // Disconnect user if in a VC
    if (member.voice.channel) {
        try {
            await member.voice.disconnect();
        } catch (err) {
            console.error(err);
            await interaction.reply({ content: '❌ Failed to disconnect the user.', ephemeral: true });
            return;
        }
    }

    // Ban from all voice channels by denying Connect permission
    try {
        const voiceChannels = interaction.guild?.channels.cache.filter(c => c.isVoiceBased()) as Map<string, VoiceChannel>;
        if (!voiceChannels) return;

        for (const [, channel] of voiceChannels) {
            await channel.permissionOverwrites.edit(member, {
                Connect: false
            });
        }

        await interaction.reply({ content: `✅ ${member.user.tag} has been VC banned. Reason: ${reason}` });
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ Failed to apply VC ban.', ephemeral: true });
    }
};

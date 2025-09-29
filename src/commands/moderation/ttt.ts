import {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    ButtonInteraction
} from 'discord.js';

type Player = 'X' | 'O';
type Board = (Player | null)[][];

export default {
    data: new SlashCommandBuilder()
        .setName('tictactoe')
        .setDescription('Play Tic Tac Toe with the bot!'),

    async execute(interaction: ChatInputCommandInteraction) {
        const board: Board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];

        let currentPlayer: Player = 'X'; // Player is always X
        let gameOver = false;

        const renderBoard = (): ActionRowBuilder<ButtonBuilder>[] => {
            return board.map((row, rowIndex) => {
                const actionRow = new ActionRowBuilder<ButtonBuilder>();
                row.forEach((cell, colIndex) => {
                    actionRow.addComponents(
                        new ButtonBuilder()
                            .setCustomId(`${rowIndex}-${colIndex}`)
                            .setLabel(cell ?? ' ')
                            .setStyle(ButtonStyle.Secondary)
                            .setDisabled(!!cell || gameOver)
                    );
                });
                return actionRow;
            });
        };

        const checkWinner = (): Player | 'Draw' | null => {
            // Rows and columns
            for (let i = 0; i < 3; i++) {
                if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2])
                    return board[i][0];
                if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i])
                    return board[0][i];
            }
            // Diagonals
            if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return board[0][0];
            if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return board[0][2];

            // Draw
            if (board.flat().every(cell => cell)) return 'Draw';
            return null;
        };

        const makeBotMove = () => {
            const emptyCells: [number, number][] = [];
            board.forEach((row, r) => row.forEach((cell, c) => { if (!cell) emptyCells.push([r, c]); }));
            if (emptyCells.length === 0) return;

            const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[r][c] = 'O';
        };

        await interaction.reply({ content: 'Tic Tac Toe! You are X.', components: renderBoard() });

        const collector = interaction.channel?.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: 60000
        });

        collector?.on('collect', async (i: ButtonInteraction) => {
            if (gameOver) return;
            if (i.user.id !== interaction.user.id) {
                i.reply({ content: "This is not your game!", ephemeral: true });
                return;
            }

            const [row, col] = i.customId.split('-').map(Number);

            if (board[row][col]) {
                i.reply({ content: "That spot is already taken!", ephemeral: true });
                return;
            }

            board[row][col] = 'X';

            // Check player win
            let winner = checkWinner();
            if (!winner) {
                makeBotMove();
                winner = checkWinner();
            }

            if (winner) {
                gameOver = true;
            }

            await i.update({ content: winner ? (winner === 'Draw' ? 'It is a draw!' : `${winner} wins!`) : 'Tic Tac Toe! You are X.', components: renderBoard() });
        });

        collector?.on('end', () => {
            if (!gameOver) interaction.editReply({ content: 'Game ended due to inactivity.', components: [] });
        });
    }
};

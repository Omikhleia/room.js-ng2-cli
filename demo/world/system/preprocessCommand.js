function preprocessCommand(player, input) {
  const prefix = input.substring(0, 1);
  if (prefix === '@') {
    // Consider inputs starting with @ as direct play command
    // (whatever mode is active)
    const direct = input.substring(1);
    return modes_playmode.preprocessCommand(direct);
  }

  return player.mode.preprocessCommand(input);
}


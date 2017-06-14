function onPlayerConnected(player) {
  // player.tell(color.bold.blue(`Welcome ${player.name}! Explore the World!`));
  // Unless we have hundreds of players, any entrance in the world is worth broadcasting ;)
  this.broadcast((sender, recipient) => {
    if (sender === recipient) {
      return color.bold.blue(`Greetings ${player.name}!`);
    }
    return color.bold.blue(`[${sender.name} enters the world]`);
  }, player);
  
  player.inventory({ player });

  player.renderPrompt();
  if (player.previousLocation) {
    // Restore previous location
    player.previousLocation.doEnter(player);
    player.previousLocation = null;
  } else if (!player.location) {
    // Safeguard
    player.tell(color.red('What are you doing in the Void? Sending you back to Heaven.'));
    areas.start.heaven.doEnter(player);
  } else {
    // May happen if player did not exit correctly
    player.tell(color.red('Your soul returns to your body.'));
    // Re-enter location, to re-enable effects, etc.
    player.location.doEnter(player);
  }
}

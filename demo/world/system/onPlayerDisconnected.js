function onPlayerDisconnected(player) {
  if (player.location) {
    player.location.announce(player.location.announceLeaveRoom.bind(player.location), player, 'away');
  }
  player.previousLocation = player.location;
  player.location = null;
}

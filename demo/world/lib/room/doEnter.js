function doEnter(player, direction) {
  player.location = this;
  player.location.announce(this.announceEnterRoom.bind(this), player, direction);
  this.look({ player });
  this.onEnter(player);
}

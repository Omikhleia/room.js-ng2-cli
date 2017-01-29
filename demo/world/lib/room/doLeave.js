function doLeave(agent, direction) {
  agent.location.announce(this.announceLeaveRoom.bind(this), agent, direction);
  this.onLeave(agent);
}

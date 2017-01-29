function doUnlock(agent) {

  function announce(sender, recipient, object) {
    if (sender === recipient) {
      return { effect: sounds.unlock,
               text: `You unlock the ${object.name}.` };
    }
    return { effect: sounds.unlock,
             text: `${sender.name} unlocks some ${object.name}.` };
  }

  if (agent !== undefined && agent.location) {
    agent.location.announce(announce, agent, this);
  }
  this.locked = false;
  this.onUnlock(agent);
}

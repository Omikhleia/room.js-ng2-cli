function doLock(agent) {

  function announce(sender, recipient, object) {
    if (sender === recipient) {
      return { effect: sounds.lock,
               text: `You lock the ${object.name}.` };
    }
    return { effect: sounds.lock,
             text: `${sender.name} locks some ${object.name}.` };
  }

  if (agent !== undefined && agent.location) {
    agent.location.announce(announce, agent, this);
  }
  this.locked = true;
  this.onLock(agent);
}

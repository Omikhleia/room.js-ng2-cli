function doClose(agent) {

  function announce(sender, recipient, object) {
    if (sender === recipient) {
      return { effect: sounds.close,
               text: `You close the ${object.name}.` };
    }
    return { effect: sounds.close,
             text: `${sender.name} closes some ${object.name}.` };
  }

  if (agent !== undefined && agent.location) {
    agent.location.announce(announce, agent, this);
  }

  if (this.locked || !!this.autolocking) {
    this.locked = true;
    if (agent !== undefined && agent.location) {
      agent.location.announce(views.noOp, agent, `The ${this.name} locks itself.`);
    }
  }

  this.closed = true;
  this.onOpen(agent);
}

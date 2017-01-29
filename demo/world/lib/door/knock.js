function knock({ player, dobj, iobj, verbstr, argstr, dobjstr, prepstr, iobjstr }) {
  this.announce((sender, recipient) => {
    if (sender === recipient) {
      return { effect: sounds.doorKnock, text: `You knock at ${iobj.name}.` };
    }
    
    return { effect: sounds.doorKnock, text: `${player.name} knocks at ${iobj.name}.` };
  }, player);
}

function order({ player, dobj, iobj, verbstr, argstr, dobjstr, prepstr, iobjstr }) {
  if (!dobjstr) {
    player.tell(`${this.name} says: "What?"`);
    return;
  }

  const target = this.findInside(dobjstr);

  if (target === fail) {
    player.tell(`${this.name} says: "I am sorry, we don't have any ${noun(dobjstr)[1]}."`);
  } else if (target === ambiguous) {
    player.tell(`${this.name} says: "I can't tell which ${dobjstr} you meant."`);
  } else {
    player.tell(`${this.name} says: "You are welcome!"`);

    // Clone the good
    const created = target.clone('instances.' + target.id.split('.').pop());

    if (this !== player) {
      // Give to player
      created.location = player;
      player.location.announce(this.announceSale.bind(this), player, created);
      player.updateInventory();
    } else {
      // Handle the fun case where the player/programmer would have added the trait to himself...
      created.location = this.location;
      this.location.announce(this.announceOffer.bind(this), player, created);
      this.location.updateContents();
    }
  }
}

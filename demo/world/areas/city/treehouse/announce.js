function announce(viewFn = views.noOp, sender, msg) {
  if (!this.exits || !this.exits.down) {
    // Safeguard
    return;
  }

  // Announce in the room itself...
  this.contents.forEach(recipient => {
    recipient.tell(viewFn(sender, recipient, msg));
  });
  // ... and propagate down.
  this.exits.down.announce((senderx, recipient, message) => {
    if (recipient !== items_oaktree) {
      var m = viewFn(senderx, recipient, message);
      if (m.text) {
        m.text = color.gray('(From the tree) ') + m.text;
        return m;
      } 
      return color.gray('(From the tree) ') + m;
    }
    return null;
  }, sender, msg);
}

function tell(msg) {
  // Propagate up the tree  
  if (msg !== null) {
    var m;
    if (msg.text) {
      m = msg;
      m.text = color.gray('(From the ground) ') + msg.text;
    } else {
      m = color.gray('(From the ground) ') + msg;
    }
    
    areas.city.treehouse.contents.forEach(recipient => {
      recipient.tell(m);
    });
  }
}

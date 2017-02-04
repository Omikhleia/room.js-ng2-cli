function announceLeaveRoom(sender, recipient, direction) {
  const playersHere = this.contents.filter(obj => obj.player);
  const players = [];
  playersHere.forEach(plr => {
    if (sender !== plr) { 
      const flag = (plr.programmer ? 0x02 : 0x00) | (plr.online ? 0x01 : 0x00);
      players.push({ name: plr.name, flag });
    }
  });
  
  var effect = null;
  if ((this.leaveEffect) && sounds[this.leaveEffect]) {
    effect = sounds[this.leaveEffect];
  }
  
  if (sender === recipient) {
    if (effect) { return { effect }; }   
    return null;
  }
  
  if (effect) { return { effect, players, text: `${sender.name} goes ${direction}` }; }  
  return { players, text: `${sender.name} goes ${direction}.` };
}

function announceEnterRoom(sender, recipient, direction) {
  const image = this.id;
  const room = this.name;
  
  const playersHere = this.contents.filter(obj => obj.player);
  const players = [];
  playersHere.forEach(plr => {
    const flag = (plr.programmer ? 0x02 : 0x00) | (plr.online ? 0x01 : 0x00);
    players.push({ name: plr.name, flag });
  });
  
  var effect = null;
  if ((this.enterEffect) && sounds[this.enterEffect]) {
    effect = sounds[this.enterEffect];
  }
  
  if (sender === recipient) {
    var exits = Object.keys(this.exits);
    
    var ambiant;
    if ((this.ambiant) && sounds[this.ambiant]) {
      ambiant = sounds[this.ambiant];
    } else {
      ambiant = [];
    }
    
    if (effect) { return { ambiant, effect, players, image, room, exits }; }
    return { ambiant, players, image, room, exits };
  }
  
  if (effect) { return { effect, players, image, text: `${sender.name} enters.` }; }  
  return { players, image, text: `${sender.name} enters.` };
}

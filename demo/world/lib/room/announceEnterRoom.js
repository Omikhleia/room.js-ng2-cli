function announceEnterRoom(sender, recipient, direction) {
  const image = this.id;
  
  const playersHere = this.contents.filter(obj => obj.player);
  const players = [];
  playersHere.forEach(plr => {
    players.push(plr.name);
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
    
    if (effect) { return { ambiant, effect, players, image, exits }; }
    return { ambiant, players, image, exits };
  }
  
  if (effect) { return { effect, players, image, text: `${sender.name} enters.` }; }  
  return { players, image, text: `${sender.name} enters.` };
}

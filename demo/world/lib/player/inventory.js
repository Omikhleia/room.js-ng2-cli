function inventory({ player }) {
  if (this.contents.length === 0) {
    player.tell(color.bold.magenta('You are empty handed.'));
  } else {
    const output = [color.bold.magenta('You are carrying:')];
    const inventory = [];

    this.contents.forEach(obj => {
      // For robustness, ensure objects have a description method
      if (typeof obj.describe === 'function') {
        output.push(util.capitalize(obj.describe()));
      }
      inventory.push(obj.name);
    });

    player.tell({ inventory, text: output.join('\n   ') });
  }
}

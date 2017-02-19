function updateInventory() {
  const inventory = [];
  this.contents.forEach(obj => {
    inventory.push(obj.name);
  });

  this.tell({ inventory });
}
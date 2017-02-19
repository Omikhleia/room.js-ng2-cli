function doGive(item) {
  item.location = this;
  
  const inventory = [];
  this.contents.forEach(obj => {
    inventory.push(obj.name);
  });

  this.tell({ inventory });
}
function updateContents() {
  const contents = [];
  this.contents.forEach(obj => {
    if (!obj.player) {
      contents.push(obj.name);
    }
  });
  this.contents.forEach(recipient => {
    recipient.tell({ contents });
  });
}
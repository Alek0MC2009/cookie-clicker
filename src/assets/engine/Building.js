class Building {
  constructor(name, id, cost, cps) {
    this.name = name;
    this.id = id;
    this.baseCost = cost;
    this.cps = cps;
    this.count = 0;
  }

  getCost() {
    return Math.floor(this.baseCost * Math.pow(1.15, this.count));
  }

  buy(game) {
    const cost = this.getCost();

    if (game.cookies >= cost) {
      game.cookies -= cost;
      this.count++;
      game.cps += this.cps;
      return true;
    }

    return false;
  }
}

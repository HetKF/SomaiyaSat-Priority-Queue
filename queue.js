export class PriorityQueue {
  constructor(capacity = 8) { this.capacity = capacity; this.items = []; this.nextId = 1; }
  enqueue(mode) {
    if (this.items.length === this.capacity || !Number.isInteger(mode) || mode < 1 || mode > 4) return null;
    const packet = { id: this.nextId++, mode, priority: mode < 3 ? mode : 3 };
    let i = this.items.length - 1;
    while (i >= 0 && this.items[i].priority > packet.priority) {
      this.items[i + 1] = this.items[i];
      i--;
    }
    this.items[i + 1] = packet;
    return packet;
  }
  dequeue() {
    if (!this.items.length) return null;
    const packet = this.items[0];
    for (let i = 1; i < this.items.length; i++) this.items[i - 1] = this.items[i];
    this.items.length--;
    return packet;
  }
}

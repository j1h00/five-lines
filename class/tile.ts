interface Tile2 {
  isAir(): boolean;
  isFlux(): boolean;
  isUnbreakable(): boolean;
  isPlayer(): boolean;
  isStone(): boolean;
  isFallingStone(): boolean;
  isBox(): boolean;
  isFallingBox(): boolean;
  isKey1(): boolean;
  isLock1(): boolean;
  isKey2(): boolean;
  isLock2(): boolean;
}

class Air implements Tile2 {
  isAir() {
    return true;
  }
  isFlux() {
    return false;
  }
  isUnbreakable() {
    return false;
  }
  isPlayer() {
    return false;
  }
  isStone() {
    return false;
  }
  isFallingStone() {
    return false;
  }
  isBox(): boolean {
    return false;
  }
  isFallingBox(): boolean {
    return false;
  }
  isKey1(): boolean {
    return false;
  }
  isLock1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
}
class Flux implements Tile2 {
  isAir() {
    return false;
  }
  isFlux() {
    return true;
  }
  isUnbreakable() {
    return false;
  }
  isPlayer() {
    return false;
  }
  isStone() {
    return false;
  }
  isFallingStone() {
    return false;
  }
  isBox(): boolean {
    return false;
  }
  isFallingBox(): boolean {
    return false;
  }
  isKey1(): boolean {
    return false;
  }
  isLock1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
}
class Unbreakable implements Tile2 {
  isAir() {
    return false;
  }
  isFlux() {
    return false;
  }
  isUnbreakable() {
    return true;
  }
  isPlayer() {
    return false;
  }
  isStone() {
    return false;
  }
  isFallingStone() {
    return false;
  }
  isBox(): boolean {
    return false;
  }
  isFallingBox(): boolean {
    return false;
  }
  isKey1(): boolean {
    return false;
  }
  isLock1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
}
class Player implements Tile2 {
  isAir() {
    return false;
  }
  isFlux() {
    return false;
  }
  isUnbreakable() {
    return false;
  }
  isPlayer() {
    return true;
  }
  isStone() {
    return false;
  }
  isFallingStone() {
    return false;
  }
  isBox(): boolean {
    return false;
  }
  isFallingBox(): boolean {
    return false;
  }
  isKey1(): boolean {
    return false;
  }
  isLock1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
}
class Stone implements Tile2 {
  isAir() {
    return false;
  }
  isFlux() {
    return false;
  }
  isUnbreakable() {
    return false;
  }
  isPlayer() {
    return false;
  }
  isStone() {
    return true;
  }
  isFallingStone() {
    return false;
  }
  isBox(): boolean {
    return false;
  }
  isFallingBox(): boolean {
    return false;
  }
  isKey1(): boolean {
    return false;
  }
  isLock1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
}
class FallingStone implements Tile2 {
  isAir() {
    return false;
  }
  isFlux() {
    return false;
  }
  isUnbreakable() {
    return false;
  }
  isPlayer() {
    return false;
  }
  isStone() {
    return false;
  }
  isFallingStone() {
    return true;
  }
  isBox(): boolean {
    return false;
  }
  isFallingBox(): boolean {
    return false;
  }
  isKey1(): boolean {
    return false;
  }
  isLock1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
}
class Box implements Tile2 {
  isAir() {
    return false;
  }
  isFlux() {
    return false;
  }
  isUnbreakable() {
    return false;
  }
  isPlayer() {
    return false;
  }
  isStone() {
    return false;
  }
  isFallingStone() {
    return false;
  }
  isBox(): boolean {
    return true;
  }
  isFallingBox(): boolean {
    return false;
  }
  isKey1(): boolean {
    return false;
  }
  isLock1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
}
class FallingBox implements Tile2 {
  isAir() {
    return false;
  }
  isFlux() {
    return false;
  }
  isUnbreakable() {
    return false;
  }
  isPlayer() {
    return false;
  }
  isStone() {
    return false;
  }
  isFallingStone() {
    return false;
  }
  isBox(): boolean {
    return false;
  }
  isFallingBox(): boolean {
    return true;
  }
  isKey1(): boolean {
    return false;
  }
  isLock1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
}
class Key1 implements Tile2 {
  isAir() {
    return false;
  }
  isFlux() {
    return false;
  }
  isUnbreakable() {
    return false;
  }
  isPlayer() {
    return false;
  }
  isStone() {
    return false;
  }
  isFallingStone() {
    return false;
  }
  isBox(): boolean {
    return false;
  }
  isFallingBox(): boolean {
    return false;
  }
  isKey1(): boolean {
    return true;
  }
  isLock1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
}
class Lock1 implements Tile2 {
  isAir() {
    return false;
  }
  isFlux() {
    return false;
  }
  isUnbreakable() {
    return false;
  }
  isPlayer() {
    return false;
  }
  isStone() {
    return false;
  }
  isFallingStone() {
    return false;
  }
  isBox(): boolean {
    return false;
  }
  isFallingBox(): boolean {
    return false;
  }
  isKey1(): boolean {
    return false;
  }
  isLock1(): boolean {
    return true;
  }
  isKey2(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
}
class Key2 implements Tile2 {
  isAir() {
    return false;
  }
  isFlux() {
    return false;
  }
  isUnbreakable() {
    return false;
  }
  isPlayer() {
    return false;
  }
  isStone() {
    return false;
  }
  isFallingStone() {
    return false;
  }
  isBox(): boolean {
    return false;
  }
  isFallingBox(): boolean {
    return false;
  }
  isKey1(): boolean {
    return false;
  }
  isLock1(): boolean {
    return true;
  }
  isKey2(): boolean {
    return false;
  }
  isLock2(): boolean {
    return false;
  }
}
class Lock2 implements Tile2 {
  isAir() {
    return false;
  }
  isFlux() {
    return false;
  }
  isUnbreakable() {
    return false;
  }
  isPlayer() {
    return false;
  }
  isStone() {
    return false;
  }
  isFallingStone() {
    return false;
  }
  isBox(): boolean {
    return false;
  }
  isFallingBox(): boolean {
    return false;
  }
  isKey1(): boolean {
    return false;
  }
  isLock1(): boolean {
    return false;
  }
  isKey2(): boolean {
    return false;
  }
  isLock2(): boolean {
    return true;
  }
}

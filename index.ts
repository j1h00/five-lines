interface Input {
  isRight(): boolean;
  isLeft(): boolean;
  isUp(): boolean;
  isDown(): boolean;

  handle(): void;
}

class Right implements Input {
  isRight() {
    return true;
  }
  isLeft() {
    return false;
  }
  isUp() {
    return false;
  }
  isDown() {
    return false;
  }

  handle() {
    map[playery][playerx - 1].moveHorizontal(-1);
  }
}
class Left implements Input {
  isRight() {
    return false;
  }
  isLeft() {
    return true;
  }
  isUp() {
    return false;
  }
  isDown() {
    return false;
  }

  handle() {
    map[playery][playerx + 1].moveHorizontal(1);
  }
}
class Up implements Input {
  isRight() {
    return false;
  }
  isLeft() {
    return false;
  }
  isUp() {
    return true;
  }
  isDown() {
    return false;
  }

  handle() {
    moveVertical(-1);
  }
}
class Down implements Input {
  isRight() {
    return false;
  }
  isLeft() {
    return false;
  }
  isUp() {
    return false;
  }
  isDown() {
    return true;
  }

  handle() {
    moveVertical(1);
  }
}

interface Tile {
  isAir(): boolean;
  isFlux(): boolean;
  isUnbreakable(): boolean;
  isPlayer(): boolean;
  isFallingStone(): boolean;
  isFallingBox(): boolean;
  isKey1(): boolean;
  isLock1(): boolean;
  isKey2(): boolean;
  isLock2(): boolean;
  isEdible(): boolean;
  isPushable(): boolean;
  isStony(): boolean;
  isBoxy(): boolean;

  // color(g: CanvasRenderingContext2D): void;
  draw(g: CanvasRenderingContext2D, x: number, y: number): void;
  moveHorizontal(dx: number): void;
}

class Air implements Tile {
  isStony() {
    return false;
  }
  isBoxy() {
    return false;
  }

  isEdible() {
    return true;
  }

  isPushable() {
    return false;
  }

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
  isFallingStone() {
    return false;
  }
  isFallingBox() {
    return false;
  }
  isKey1() {
    return false;
  }
  isLock1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return false;
  }

  color(g: CanvasRenderingContext2D) {}
  draw(g: CanvasRenderingContext2D) {}
  moveHorizontal(dx: number) {
    moveToTile(playerx + dx, playery);
  }
}
class Flux implements Tile {
  isStony() {
    return false;
  }
  isBoxy() {
    return false;
  }

  isEdible() {
    return true;
  }

  isPushable() {
    return false;
  }

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
  isFallingStone() {
    return false;
  }
  isFallingBox() {
    return false;
  }
  isKey1() {
    return false;
  }
  isLock1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return false;
  }

  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#ccffcc';
    if (!map[y][x].isAir() && !map[y][x].isPlayer()) g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {
    moveToTile(playerx + dx, playery);
  }
}
class Unbreakable implements Tile {
  isStony() {
    return false;
  }
  isBoxy() {
    return false;
  }
  isEdible() {
    return false;
  }
  isPushable() {
    return false;
  }

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
  isFallingStone() {
    return false;
  }
  isFallingBox() {
    return false;
  }
  isKey1() {
    return false;
  }
  isLock1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return false;
  }

  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#999999';
    if (!map[y][x].isAir() && !map[y][x].isPlayer()) g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(dx: number) {}
}
class Player implements Tile {
  isStony() {
    return false;
  }
  isBoxy() {
    return false;
  }
  isEdible() {
    return false;
  }
  isPushable() {
    return false;
  }

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
  isFallingStone() {
    return false;
  }
  isFallingBox() {
    return false;
  }
  isKey1() {
    return false;
  }
  isLock1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return false;
  }
  color(g: CanvasRenderingContext2D) {}
  draw(g: CanvasRenderingContext2D) {}
  moveHorizontal(dx: number) {}
}
class Stone implements Tile {
  private falling: boolean;
  constructor(falling: boolean) {
    this.falling = false;
  }

  isStony() {
    return true;
  }
  isBoxy() {
    return false;
  }
  isEdible() {
    return false;
  }

  isPushable() {
    return true;
  }

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
  isFallingStone() {
    return this.falling;
  }
  isFallingBox() {
    return false;
  }
  isKey1() {
    return false;
  }
  isLock1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return false;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#0000cc';
    if (!map[y][x].isAir() && !map[y][x].isPlayer()) g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number): void {
    if (!this.isFallingStone()) {
      if (map[playery][playerx + dx + dx].isAir() && !map[playery + 1][playerx + dx].isAir()) {
        map[playery][playerx + dx + dx] = this;
        moveToTile(playerx + dx, playery);
      }
    } else if (this.isFallingStone()) {
    }
  }
}
class FallingStone implements Tile {
  private falling: boolean;
  constructor(falling: boolean) {
    this.falling = true;
  }

  isStony() {
    return true;
  }
  isBoxy() {
    return false;
  }

  isEdible() {
    return false;
  }

  isPushable() {
    return false;
  }

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
  isFallingStone() {
    return this.falling;
  }
  isFallingBox() {
    return false;
  }
  isKey1() {
    return false;
  }
  isLock1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return false;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#0000cc';
    if (!map[y][x].isAir() && !map[y][x].isPlayer()) g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {
    if (!this.isFallingStone()) {
      if (map[playery][playerx + dx + dx].isAir() && !map[playery + 1][playerx + dx].isAir()) {
        map[playery][playerx + dx + dx] = this;
        moveToTile(playerx + dx, playery);
      }
    } else if (this.isFallingStone()) {
    }
  }
}
class Box implements Tile {
  isStony() {
    return false;
  }
  isBoxy() {
    return true;
  }
  isEdible() {
    return false;
  }

  isPushable() {
    return true;
  }
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
  isFallingStone() {
    return false;
  }
  isFallingBox() {
    return false;
  }
  isKey1() {
    return false;
  }
  isLock1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return false;
  }

  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#8b4513';
    if (!map[y][x].isAir() && !map[y][x].isPlayer()) g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(dx: number): void {
    if (map[playery][playerx + dx + dx].isAir() && !map[playery + 1][playerx + dx].isAir()) {
      map[playery][playerx + dx + dx] = this;
      moveToTile(playerx + dx, playery);
    }
  }
}
class FallingBox implements Tile {
  isStony() {
    return false;
  }
  isBoxy() {
    return true;
  }
  isEdible() {
    return false;
  }
  isPushable() {
    return false;
  }
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
  isFallingStone() {
    return false;
  }
  isFallingBox() {
    return true;
  }
  isKey1() {
    return false;
  }
  isLock1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return false;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#8b4513';
    if (!map[y][x].isAir() && !map[y][x].isPlayer()) g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(dx: number) {}
}
class Key1 implements Tile {
  isStony() {
    return false;
  }
  isBoxy() {
    return false;
  }

  isEdible() {
    return false;
  }
  isPushable() {
    return false;
  }
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
  isFallingStone() {
    return false;
  }
  isFallingBox() {
    return false;
  }
  isKey1() {
    return true;
  }
  isLock1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return false;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#ffcc00';
    if (!map[y][x].isAir() && !map[y][x].isPlayer()) g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(dx: number): void {
    removeLock1();
    moveToTile(playerx + dx, playery);
  }
}
class Lock1 implements Tile {
  isStony() {
    return false;
  }
  isBoxy() {
    return false;
  }
  isEdible() {
    return false;
  }
  isPushable() {
    return false;
  }
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
  isFallingStone() {
    return false;
  }
  isFallingBox() {
    return false;
  }
  isKey1() {
    return false;
  }
  isLock1() {
    return true;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return false;
  }

  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#ffcc00';
    if (!map[y][x].isAir() && !map[y][x].isPlayer()) g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {}
}
class Key2 implements Tile {
  isStony() {
    return false;
  }
  isBoxy() {
    return false;
  }

  isEdible() {
    return false;
  }
  isPushable() {
    return false;
  }
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
  isFallingStone() {
    return false;
  }
  isFallingBox() {
    return false;
  }
  isKey1() {
    return false;
  }
  isLock1() {
    return true;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return false;
  }

  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#00ccff';
    if (!map[y][x].isAir() && !map[y][x].isPlayer()) g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number): void {
    removeLock1();
    moveToTile(playerx + dx, playery);
  }
}
class Lock2 implements Tile {
  isStony() {
    return false;
  }
  isBoxy() {
    return false;
  }
  isEdible() {
    return false;
  }
  isPushable() {
    return false;
  }
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
  isFallingStone() {
    return false;
  }
  isFallingBox() {
    return false;
  }
  isKey1() {
    return false;
  }
  isLock1() {
    return false;
  }
  isKey2() {
    return false;
  }
  isLock2() {
    return true;
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = '#00ccff';
    if (!map[y][x].isAir() && !map[y][x].isPlayer()) g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(dx: number) {}
}

const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

enum RawTile {
  AIR,
  FLUX,
  UNBREAKABLE,
  PLAYER,
  STONE,
  FALLING_STONE,
  BOX,
  FALLING_BOX,
  KEY1,
  LOCK1,
  KEY2,
  LOCK2,
}

let playerx = 1;
let playery = 1;
let rawMap: RawTile[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 2, 0, 2],
  [2, 4, 2, 6, 1, 2, 0, 2],
  [2, 8, 4, 1, 1, 2, 0, 2],
  [2, 4, 1, 1, 1, 9, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];

let map: Tile[][];
function assetExhausted(x: never): never {
  throw new Error(`Unexpected object: ` + x);
}

function transformTile(raw: RawTile) {
  switch (raw) {
    case RawTile.AIR:
      return new Air();
    case RawTile.FLUX:
      return new Flux();
    case RawTile.UNBREAKABLE:
      return new Unbreakable();
    case RawTile.PLAYER:
      return new Player();
    case RawTile.STONE:
      return new Stone(false);
    case RawTile.FALLING_STONE:
      return new FallingStone(true);
    case RawTile.BOX:
      return new Box();
    case RawTile.FALLING_BOX:
      return new FallingBox();
    case RawTile.KEY1:
      return new Key1();
    case RawTile.LOCK1:
      return new Lock1();
    case RawTile.KEY2:
      return new Key2();
    case RawTile.LOCK2:
      return new Lock2();
    default:
      return assetExhausted(raw);
  }
}

function transformMap() {
  map = new Array();
  for (let y = 0; y < rawMap.length; y++) {
    map[y] = new Array(rawMap[y].length);
    for (let x = 0; x < rawMap[y].length; x++) {
      map[y][x] = transformTile(rawMap[y][x]);
    }
  }
}

let inputs: Input[] = [];

function removeLock1() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLock1()) {
        map[y][x] = new Air();
      }
    }
  }
}

function removeLock2() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLock2()) {
        map[y][x] = new Air();
      }
    }
  }
}

function moveToTile(newx: number, newy: number) {
  map[playery][playerx] = new Air();
  map[newy][newx] = new Player();
  playerx = newx;
  playery = newy;
}

function moveVertical(dy: number) {
  if (map[playery + dy][playerx].isFlux() || map[playery + dy][playerx].isAir()) {
    moveToTile(playerx, playery + dy);
  } else if (map[playery + dy][playerx].isKey1()) {
    removeLock1();
    moveToTile(playerx, playery + dy);
  } else if (map[playery + dy][playerx].isKey2()) {
    removeLock2();
    moveToTile(playerx, playery + dy);
  }
}

function handleInputs() {
  while (inputs.length > 0) {
    let current = inputs.pop();
    current.handle();
  }
}

function updateTile(x: number, y: number) {
  if (map[y][x].isStony() && map[y + 1][x].isAir()) {
    map[y + 1][x] = new FallingStone(true);
    map[y][x] = new Air();
  } else if (map[y][x].isBoxy() && map[y + 1][x].isAir()) {
    map[y + 1][x] = new FallingBox();
    map[y][x] = new Air();
  } else if (map[y][x].isFallingStone()) {
    map[y][x] = new Stone(false);
  } else if (map[y][x].isFallingBox()) {
    map[y][x] = new Box();
  }
}

function updateMap() {
  for (let y = map.length - 1; y >= 0; y--) {
    for (let x = 0; x < map[y].length; x++) {
      updateTile(x, y);
    }
  }
}

function update() {
  handleInputs();
  updateMap();
}

function createGraphics() {
  const canvas = document.getElementById('GameCanvas') as HTMLCanvasElement;
  const g = canvas.getContext('2d');
  g.clearRect(0, 0, canvas.width, canvas.height);

  return g;
}

// function drawTile(g: CanvasRenderingContext2D, x: number, y: number) {
//   map[y][x].color(g);
//   if (!map[y][x].isAir() && !map[y][x].isPlayer()) g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
// }

function drawMap(g: CanvasRenderingContext2D) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      map[x][y].draw(g, x, y);
    }
  }
}

function drawPlayer(g: CanvasRenderingContext2D) {
  g.fillStyle = '#ff0000';
  g.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function draw() {
  const g = createGraphics();
  drawMap(g);
  drawPlayer(g);
}

function gameLoop() {
  let before = Date.now();
  update();
  draw();
  let after = Date.now();
  let frameTime = after - before;
  let sleep = SLEEP - frameTime;
  setTimeout(() => gameLoop(), sleep);
}

window.onload = () => {
  transformMap();
  gameLoop();
};

const LEFT_KEY = 'ArrowLeft';
const UP_KEY = 'ArrowUp';
const RIGHT_KEY = 'ArrowRight';
const DOWN_KEY = 'ArrowDown';
window.addEventListener('keydown', (e) => {
  if (e.key === LEFT_KEY || e.key === 'a') inputs.push(new Left());
  else if (e.key === UP_KEY || e.key === 'w') inputs.push(new Up());
  else if (e.key === RIGHT_KEY || e.key === 'd') inputs.push(new Right());
  else if (e.key === DOWN_KEY || e.key === 's') inputs.push(new Down());
});

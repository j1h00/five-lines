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
    map[player.getY()][player.getX() + 1].moveHorizontal(1);
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
    map[player.getY()][player.getX() - 1].moveHorizontal(-1);
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
    map[player.getY() - 1][player.getX()].moveVertical(player: Player, -1);
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
    map[player.getY() + 1][player.getX()].moveVertical(player: Player, 1);
  }
}

interface FallingState {
  isFalling(): boolean;

  moveHorizontal(tile: Tile, dx: number): void;
  drop(tile: Tile, x: number, y: number): void;
}

class Falling implements FallingState {
  isFalling() {
    return true;
  }

  moveHorizontal(tile: Tile, dx: number) {}

  drop(tile: Tile, x: number, y: number) {
    map[y + 1][x] = tile;
    map[y][x] = new Air();
  }
}

class Resting implements FallingState {
  isFalling() {
    return false;
  }

  moveHorizontal(tile: Tile, dx: number) {
    if (map[player.getY()][player.getX() + dx + dx].isAir() && !map[player.getY() + 1][player.getX() + dx].isAir()) {
      map[player.getY()][player.getX() + dx + dx] = tile;
      moveToTile(player.getX() + dx, player.getY());
    }
  }

  drop(tile: Tile, x: number, y: number) {}
}

interface Tile {
  isAir(): boolean;
  isLock1(): boolean;
  isLock2(): boolean;

  draw(g: CanvasRenderingContext2D, x: number, y: number): void;
  moveHorizontal(player: Player, dx: number): void;
  moveVertical(player: Player, dy: number): void;

  update(x: number, y: number): void;

  getBlockOnTopState(): FallingState;
}

class Air implements Tile {
  isAir() {
    return true;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }

  draw(g: CanvasRenderingContext2D) {}
  moveHorizontal(player: Player, dx: number) {
    moveToTile(player.getX() + dx, player.getY());
  }

  moveVertical(player: Player, dy: number) {
    moveToTile(player.getX(), player.getY() + dy);
  }

  update(x: number, y: number) {}

  getBlockOnTopState() {
    return new Falling();
  }
}
class Flux implements Tile {
  isAir() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }

  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = '#ccffcc';
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(player: Player, dx: number) {
    moveToTile(player.getX() + dx, player.getY());
  }

  moveVertical(player: Player, dy: number) {
    moveToTile(player.getX(), player.getY() + dy);
  }

  update(x: number, y: number) {}

  getBlockOnTopState() {
    return new Resting();
  }
}
class Unbreakable implements Tile {
  isAir() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }

  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = '#999999';
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(player: Player, dx: number) {}
  moveVertical(player: Player, dy: number) {}

  update(x: number, y: number) {}

  getBlockOnTopState() {
    return new Resting();
  }
}
class PlayerTile implements Tile {
  isAir() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }

  draw(g: CanvasRenderingContext2D) {}
  moveHorizontal(player: Player, dx: number) {}
  moveVertical(player: Player, dy: number) {}
  update(x: number, y: number) {}

  getBlockOnTopState() {
    return new Resting();
  }
}

class Player {
  private x = 1;
  private y = 1;

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }
}

class FallingStrategy {
  constructor(private falling: FallingState) {}
  // private getFalling() {
  //   return this.falling;
  // }

  update(tile: Tile, x: number, y: number) {
    // 4.1.1 Rule: Do not use else in if statements
    this.falling = map[y + 1][x].getBlockOnTopState();

    this.falling.drop(tile, x, y);
  }

  moveHorizontal(tile: Tile, dx: number) {
    this.falling.moveHorizontal(tile, dx);
  }
}
class Stone implements Tile {
  private fallingStrategy: FallingStrategy;
  constructor(falling: FallingState) {
    this.fallingStrategy = new FallingStrategy(falling);
  }
  isAir() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }

  isFalling() {
    return this.fallingStrategy.getFalling().isFalling();
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = '#0000cc';
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(player: Player, dx: number) {
    this.fallingStrategy.moveHorizontal(this, dx);
  }
  moveVertical(player: Player, dy: number) {}

  update(x: number, y: number) {
    this.fallingStrategy.update(this, x, y);
  }

  getBlockOnTopState() {
    return new Resting();
  }
}

class Box implements Tile {
  private fallingStrategy: FallingStrategy;
  constructor(falling: FallingState) {
    this.fallingStrategy = new FallingStrategy(falling);
  }
  isAir() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }

  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = '#8b4513';
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(player: Player, dx: number) {
    this.fallingStrategy.moveHorizontal(this, dx);
  }
  moveVertical(player: Player, dy: number) {}

  update(x: number, y: number) {
    this.fallingStrategy.update(this, x, y);
  }

  getBlockOnTopState() {
    return new Resting();
  }
}

interface RemoveStrategy {
  check(tile: Tile): boolean;
}

class RemoveLock1 implements RemoveStrategy {
  check(tile: Tile) {
    return tile.isLock1();
  }
}

class RemoveLock2 implements RemoveStrategy {
  check(tile: Tile) {
    return tile.isLock2();
  }
}

class KeyConfiguration {
  constructor(private color: string, private _1: boolean, private removeStrategy: RemoveStrategy) {}

  setColor(g: CanvasRenderingContext2D) {
    // 3.3.1 Rule: Call or forward, do one thing only
    g.fillStyle = this.color;
  }

  is1() {
    return this._1;
  }

  // private getRemoveStrategy() {
  //   return this.removeStrategy;
  // }

  removeLock() {
    remove(this.removeStrategy);
  }
}

class Key implements Tile {
  constructor(private keyConf: KeyConfiguration) {}
  isAir() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }

  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    this.keyConf.setColor(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(player: Player, dx: number) {
    this.keyConf.removeLock();
    moveToTile(player.getX() + dx, player.getY());
  }
  moveVertical(player: Player, dy: number) {
    this.keyConf.removeLock();
    moveToTile(player.getX(), player.getY() + dy);
  }

  update(x: number, y: number) {}

  getBlockOnTopState() {
    return new Resting();
  }
}
class LockTile implements Tile {
  constructor(private keyConf: KeyConfiguration) {}
  isAir() {
    return false;
  }
  isLock1() {
    return this.keyConf.is1();
  }
  isLock2() {
    return !this.keyConf.is1();
  }

  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    this.keyConf.setColor(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  moveHorizontal(player: Player, dx: number) {}
  moveVertical(player: Player, dy: number) {}
  update(x: number, y: number) {}

  getBlockOnTopState() {
    return new Resting();
  }
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

let player = new Player();
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

const YELLOW_KEY = new KeyConfiguration('#ffcc00', true, new RemoveLock1());
const BLUE_KEY = new KeyConfiguration('#00ccff', true, new RemoveLock1());

function transformTile(raw: RawTile) {
  switch (raw) {
    case RawTile.AIR:
      return new Air();
    case RawTile.FLUX:
      return new Flux();
    case RawTile.UNBREAKABLE:
      return new Unbreakable();
    case RawTile.PLAYER:
      return new PlayerTile();
    case RawTile.STONE:
      return new Stone(new Resting());
    case RawTile.FALLING_STONE:
      return new Stone(new Falling());
    case RawTile.BOX:
      return new Box(new Resting());
    case RawTile.FALLING_BOX:
      return new Box(new Falling());
    case RawTile.KEY1:
      return new Key(YELLOW_KEY);
    case RawTile.LOCK1:
      return new LockTile(YELLOW_KEY);
    case RawTile.KEY2:
      return new Key(BLUE_KEY);
    case RawTile.LOCK2:
      return new LockTile(BLUE_KEY);
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

function remove(shouldRemove: RemoveStrategy) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (shouldRemove.check(map[y][x])) {
        map[y][x] = new Air();
      }
    }
  }
}

function moveToTile(newx: number, newy: number) {
  map[player.getY()][player.getX()] = new Air();
  map[newy][newx] = new Player();
  player.setX(newx);
  player.setY(newy);
}

function handleInputs() {
  while (inputs.length > 0) {
    let current = inputs.pop();
    current.handle();
  }
}

function updateMap() {
  for (let y = map.length - 1; y >= 0; y--) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x].update(x, y);
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

function drawMap(g: CanvasRenderingContext2D) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x].draw(g, x, y);
    }
  }
}

function drawPlayer(g: CanvasRenderingContext2D) {
  g.fillStyle = '#ff0000';
  g.fillRect(player.getX() * TILE_SIZE, player.getY() * TILE_SIZE, TILE_SIZE, TILE_SIZE);
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

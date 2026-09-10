/** Byte-mode QR (versions 1–6, ECC M) as a module matrix and SVG path. */

const EXP = new Uint8Array(256);
const LOG = new Uint8Array(256);
(() => {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = x;
    LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
})();

function mul(a: number, b: number) {
  if (!a || !b) return 0;
  return EXP[(LOG[a] + LOG[b]) % 255];
}

const DATA_CW = [0, 16, 28, 44, 64, 86, 108];
const BLOCKS_M: [number, number, number][][] = [
  [],
  [[1, 16, 10]],
  [[1, 28, 16]],
  [[1, 44, 26]],
  [[2, 32, 18]],
  [[2, 43, 24]],
  [[4, 27, 16]],
];

function rsGenerator(nsym: number) {
  let poly = [1];
  for (let i = 0; i < nsym; i++) {
    const next = new Array(poly.length + 1).fill(0);
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= poly[j];
      next[j + 1] ^= mul(poly[j], EXP[i]);
    }
    poly = next;
  }
  return poly;
}

function rsEncode(data: number[], nsym: number) {
  const gen = rsGenerator(nsym);
  const ecc = new Array(nsym).fill(0);
  for (const b of data) {
    const factor = b ^ ecc[0];
    ecc.shift();
    ecc.push(0);
    if (!factor) continue;
    for (let i = 0; i < nsym; i++) ecc[i] ^= mul(gen[i + 1], factor);
  }
  return ecc;
}

function bitLen(n: number) {
  let d = 0;
  while (n) {
    d += 1;
    n >>>= 1;
  }
  return d;
}

function bchTypeInfo(data: number) {
  let d = data << 10;
  while (bitLen(d) - 11 >= 0) d ^= 0x537 << (bitLen(d) - 11);
  return ((data << 10) | d) ^ 0x5412;
}

function setFinder(grid: (0 | 1 | null)[][], x0: number, y0: number) {
  for (let y = -1; y <= 7; y++) {
    for (let x = -1; x <= 7; x++) {
      const xx = x0 + x;
      const yy = y0 + y;
      if (yy < 0 || xx < 0 || yy >= grid.length || xx >= grid.length) continue;
      const on = x >= 0 && x <= 6 && y >= 0 && y <= 6 && (x === 0 || x === 6 || y === 0 || y === 6 || (x >= 2 && x <= 4 && y >= 2 && y <= 4));
      grid[yy][xx] = on ? 1 : 0;
    }
  }
}

function setAlignment(grid: (0 | 1 | null)[][], cx: number, cy: number) {
  for (let y = -2; y <= 2; y++) {
    for (let x = -2; x <= 2; x++) {
      const on = x === -2 || x === 2 || y === -2 || y === 2 || (x === 0 && y === 0);
      grid[cy + y][cx + x] = on ? 1 : 0;
    }
  }
}

function isMasked(mask: number, x: number, y: number) {
  switch (mask) {
    case 0:
      return (x + y) % 2 === 0;
    case 1:
      return y % 2 === 0;
    case 2:
      return x % 3 === 0;
    case 3:
      return (x + y) % 3 === 0;
    case 4:
      return (Math.floor(y / 2) + Math.floor(x / 3)) % 2 === 0;
    case 5:
      return ((x * y) % 2) + ((x * y) % 3) === 0;
    case 6:
      return (((x * y) % 2) + ((x * y) % 3)) % 2 === 0;
    default:
      return (((x + y) % 2) + ((x * y) % 3)) % 2 === 0;
  }
}

function penalty(grid: (0 | 1)[][]) {
  const n = grid.length;
  let s = 0;
  for (let y = 0; y < n; y++) {
    let run = 1;
    for (let x = 1; x <= n; x++) {
      if (x < n && grid[y][x] === grid[y][x - 1]) run += 1;
      else {
        if (run >= 5) s += run - 2;
        run = 1;
      }
    }
  }
  for (let x = 0; x < n; x++) {
    let run = 1;
    for (let y = 1; y <= n; y++) {
      if (y < n && grid[y][x] === grid[y - 1][x]) run += 1;
      else {
        if (run >= 5) s += run - 2;
        run = 1;
      }
    }
  }
  for (let y = 0; y < n - 1; y++) {
    for (let x = 0; x < n - 1; x++) {
      const v = grid[y][x];
      if (v === grid[y][x + 1] && v === grid[y + 1][x] && v === grid[y + 1][x + 1]) s += 3;
    }
  }
  const finder = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];
  const match = (get: (i: number) => number) => {
    for (let i = 0; i <= n - 11; i++) {
      let ok = true;
      for (let k = 0; k < 11; k++) if (get(i + k) !== finder[k] && get(i + k) !== finder[10 - k]) {
        ok = false;
        break;
      }
      if (ok) s += 40;
    }
  };
  for (let y = 0; y < n; y++) match((i) => grid[y][i]);
  for (let x = 0; x < n; x++) match((i) => grid[i][x]);
  let dark = 0;
  for (const row of grid) for (const c of row) if (c) dark += 1;
  s += Math.abs((dark * 100) / (n * n) - 50) / 5 * 10;
  return s;
}

function bytesOf(text: string) {
  return Array.from(new TextEncoder().encode(text));
}

function chooseVersion(len: number) {
  for (let v = 1; v <= 6; v++) {
    const cap = DATA_CW[v] - 2;
    if (len <= cap) return v;
  }
  throw new Error("Invite link is too long for a QR code.");
}

function buildCodewords(text: string, version: number) {
  const data = bytesOf(text);
  const bits: number[] = [];
  const push = (val: number, n: number) => {
    for (let i = n - 1; i >= 0; i--) bits.push((val >> i) & 1);
  };
  push(0b0100, 4);
  push(data.length, 8);
  for (const b of data) push(b, 8);
  const totalBits = DATA_CW[version] * 8;
  const remain = totalBits - bits.length;
  push(0, Math.min(4, Math.max(0, remain)));
  while (bits.length % 8) bits.push(0);
  const bytes: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    let b = 0;
    for (let k = 0; k < 8; k++) b = (b << 1) | bits[i + k];
    bytes.push(b);
  }
  const pads = [0xec, 0x11];
  let p = 0;
  while (bytes.length < DATA_CW[version]) {
    bytes.push(pads[p % 2]);
    p += 1;
  }
  return bytes;
}

function interleave(bytes: number[], version: number) {
  const groups = BLOCKS_M[version];
  const blocks: { data: number[]; ecc: number[] }[] = [];
  let offset = 0;
  for (const [count, dataLen, ecLen] of groups) {
    for (let i = 0; i < count; i++) {
      const data = bytes.slice(offset, offset + dataLen);
      offset += dataLen;
      blocks.push({ data, ecc: rsEncode(data, ecLen) });
    }
  }
  const out: number[] = [];
  const maxData = Math.max(...blocks.map((b) => b.data.length));
  for (let i = 0; i < maxData; i++) for (const b of blocks) if (i < b.data.length) out.push(b.data[i]);
  const maxEcc = Math.max(...blocks.map((b) => b.ecc.length));
  for (let i = 0; i < maxEcc; i++) for (const b of blocks) if (i < b.ecc.length) out.push(b.ecc[i]);
  return out;
}

function reservedGrid(size: number, version: number) {
  const grid: (0 | 1 | null)[][] = Array.from({ length: size }, () => Array<0 | 1 | null>(size).fill(null));
  setFinder(grid, 0, 0);
  setFinder(grid, size - 7, 0);
  setFinder(grid, 0, size - 7);
  for (let i = 8; i < size - 8; i++) {
    grid[6][i] = i % 2 === 0 ? 1 : 0;
    grid[i][6] = i % 2 === 0 ? 1 : 0;
  }
  if (version >= 2) {
    const pos = [18, 22, 26, 30, 34][version - 2];
    setAlignment(grid, pos, pos);
  }
  grid[size - 8][8] = 1;
  for (let i = 0; i < 9; i++) {
    if (grid[8][i] === null) grid[8][i] = 0;
    if (grid[i][8] === null) grid[i][8] = 0;
  }
  for (let i = 0; i < 8; i++) {
    if (grid[8][size - 1 - i] === null) grid[8][size - 1 - i] = 0;
    if (grid[size - 1 - i][8] === null) grid[size - 1 - i][8] = 0;
  }
  return grid;
}

function placeData(grid: (0 | 1 | null)[][], codewords: number[], mask: number) {
  const size = grid.length;
  const bits: number[] = [];
  for (const b of codewords) for (let i = 7; i >= 0; i--) bits.push((b >> i) & 1);
  let bi = 0;
  let dir = -1;
  let y = size - 1;
  for (let x = size - 1; x > 0; x -= 2) {
    if (x === 6) x -= 1;
    for (;;) {
      for (const dx of [0, -1]) {
        const xx = x + dx;
        if (grid[y][xx] !== null) continue;
        const bit = bi < bits.length ? bits[bi] : 0;
        bi += 1;
        grid[y][xx] = (bit ^ (isMasked(mask, xx, y) ? 1 : 0)) as 0 | 1;
      }
      y += dir;
      if (y < 0 || y >= size) {
        y -= dir;
        dir = -dir;
        break;
      }
    }
  }
}

function applyFormat(grid: (0 | 1 | null)[][], mask: number) {
  const size = grid.length;
  const bits = bchTypeInfo((0 << 3) | mask);
  const pos = [
    [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7], [8, 8],
    [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8],
  ];
  const pos2 = [
    [size - 1, 8], [size - 2, 8], [size - 3, 8], [size - 4, 8], [size - 5, 8], [size - 6, 8], [size - 7, 8],
    [8, size - 8], [8, size - 7], [8, size - 6], [8, size - 5], [8, size - 4], [8, size - 3], [8, size - 2], [8, size - 1],
  ];
  for (let i = 0; i < 15; i++) {
    const bit = ((bits >> i) & 1) as 0 | 1;
    grid[pos[i][1]][pos[i][0]] = bit;
    grid[pos2[i][1]][pos2[i][0]] = bit;
  }
}

export function qrMatrix(text: string): (0 | 1)[][] {
  const version = chooseVersion(bytesOf(text).length);
  const size = 21 + 4 * (version - 1);
  const codewords = interleave(buildCodewords(text, version), version);
  let best: (0 | 1)[][] | null = null;
  let bestScore = Infinity;
  for (let mask = 0; mask < 8; mask++) {
    const grid = reservedGrid(size, version);
    placeData(grid, codewords, mask);
    applyFormat(grid, mask);
    const filled = grid.map((row) => row.map((c) => (c ? 1 : 0) as 0 | 1));
    const score = penalty(filled);
    if (score < bestScore) {
      bestScore = score;
      best = filled;
    }
  }
  return best ?? [];
}

export function qrPath(text: string, quiet = 4) {
  const matrix = qrMatrix(text);
  const n = matrix.length;
  const parts: string[] = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (matrix[y][x]) parts.push(`M${x + quiet} ${y + quiet}h1v1h-1z`);
    }
  }
  return { d: parts.join(""), dim: n + quiet * 2 };
}

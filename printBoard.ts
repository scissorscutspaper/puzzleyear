import { Board } from './pieces'

export function prettyPrintBoard(board: Board) {
  const rows = board.length;
  const cols = board[0]?.length ?? 0;

  const COLORS: Record<number, string> = {
    1: '\x1b[48;5;130m', // brown/orange background
    2: '\x1b[48;5;34m',  // green
    3: '\x1b[48;5;27m',  // blue
    4: '\x1b[48;5;124m', // red
    5: '\x1b[48;5;166m', // orange
    6: '\x1b[48;5;93m',  // purple
    7: '\x1b[48;5;220m', // yellow
    8: '\x1b[48;5;39m',  // cyan
    9: '\x1b[48;5;201m', // pink
  };

  const RESET = '\x1b[0m';
  const OUT = '\x1b[47m\x1b[30m'; // white bg, black fg for out-of-bounds
  const EMPTY = '\x1b[48;5;236m'; // dark grey background for empty

  const BLOCK = '  '; 

  let out = '   '; 
  for (let c = 0; c < cols; c++) {
    out += ` ${String(c).padStart(1, ' ')} `;
  }
  out += '\n';

  for (let r = 0; r < rows; r++) {
    out += `${String(r).padStart(2, ' ')} `;
    for (let c = 0; c < cols; c++) {
      const v = board[r][c];
      if (v === -1) {
        out += `${OUT}${BLOCK}${RESET} `;
      } else if (v === 0) {
        out += `${EMPTY}${BLOCK}${RESET} `;
      } else {
        const color = COLORS[v] ?? '\x1b[48;5;15m';
        out += `${color}${BLOCK}${RESET} `;
      }
    }
    out += '\n';
  }

  // legend row
  out += '\nLegend: ';
  out += `${OUT}${BLOCK}${RESET} out-of-bounds  `;
  out += `${EMPTY}${BLOCK}${RESET} empty  `;
  for (let id = 1; id <= 9; id++) {
    const color = COLORS[id] ?? '\x1b[48;5;15m';
    out += `${color}${BLOCK}${RESET} ${String(id)}  `;
  }
  // console.log(out);

  return out
}

import colorize from './colorize';

export function log(text: string) {
  console.log(`${colorize('>', 'brand')} ${text}`);
}

export function success(text: string) {
  console.log(`${colorize('✔', 'success')} ${text}`);
}

export function error(text: string) {
  console.log(colorize('×', 'error', true) + ' ' + text);
}

export function info(text: string) {
  console.log(colorize('i', 'info', true) + ' ' + text);
}

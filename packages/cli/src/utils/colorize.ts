import chalk from 'chalk';

export default function colorize(
  text: string,
  color: 'brand' | 'muted' | 'highlighted' | 'error' | 'success' | 'info',
  bold?: boolean
) {
  const colorValue = (() => {
    switch (color) {
      case 'brand':
        return '#FF7E03';
      case 'muted':
        return '#666666';
      case 'highlighted':
        return '#ffffff';
      case 'success':
        return '#8BC34A';
      case 'info':
        return '#03A9F4';
      case 'error':
        return '#F44336';
    }
  })();

  if (bold) {
    return chalk.hex(colorValue).bold(text);
  } else {
    return chalk.hex(colorValue)(text);
  }
}

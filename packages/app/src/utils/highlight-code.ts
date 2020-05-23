export default function highlightCode(code: string, styles: any) {
  return code
    .trim()
    .replace(/'(.*?)'/g, `<span class="${styles.string}">'$1'</span>`)
    .replace(/\/\/(.*)/g, `<span class="${styles.comment}">//$1</span>`);
}

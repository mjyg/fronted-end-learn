let output = '';
async function main() {
  const dynamic = await Promise.resolve('yideng');
  output = output + dynamic;
}
main();
export { output };

// const dynamic = await import('./data');
// const dynamic = import('./data');
// (await dynamic).default

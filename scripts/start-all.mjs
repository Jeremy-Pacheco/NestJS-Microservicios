import { spawn } from 'node:child_process';

const commands = [
  { name: 'products', args: ['run', 'start:products'] },
  { name: 'cart', args: ['run', 'start:cart'] },
  { name: 'checkout', args: ['run', 'start:checkout'] },
  { name: 'gateway', args: ['run', 'start:gateway'] },
];

const children = commands.map(({ name, args }) => {
  const child = spawn('pnpm', args, {
    shell: true,
    stdio: ['inherit', 'pipe', 'pipe'],
  });

  child.stdout.on('data', (data) => {
    process.stdout.write(`[${name}] ${data}`);
  });

  child.stderr.on('data', (data) => {
    process.stderr.write(`[${name}] ${data}`);
  });

  return child;
});

const shutdown = () => {
  for (const child of children) {
    if (!child.killed) {
      child.kill();
    }
  }
};

process.on('SIGINT', () => {
  shutdown();
  process.exit(0);
});

process.on('SIGTERM', () => {
  shutdown();
  process.exit(0);
});

for (const child of children) {
  child.on('exit', (code) => {
    if (code && code !== 0) {
      shutdown();
      process.exit(code);
    }
  });
}
module.exports = {
  apps: [
    {
      name: 'gestion-backend',
      cwd: './backend',
      script: 'dist/main.js',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};

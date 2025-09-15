module.exports = {
  apps: [
    {
      name: 'linkmetur-frontend',
      script: 'npm',
      args: 'start',
      cwd: './frontend',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: '/var/log/linkmetur/frontend-error.log',
      out_file: '/var/log/linkmetur/frontend-out.log',
      log_file: '/var/log/linkmetur/frontend-combined.log',
      time: true,
      max_memory_restart: '1G',
      node_args: '--max-old-space-size=1024'
    },
    {
      name: 'linkmetur-backend',
      script: 'dist/main.js',
      cwd: './backend',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      error_file: '/var/log/linkmetur/backend-error.log',
      out_file: '/var/log/linkmetur/backend-out.log',
      log_file: '/var/log/linkmetur/backend-combined.log',
      time: true,
      max_memory_restart: '1G',
      node_args: '--max-old-space-size=1024',
    },
    {
      name: 'linkmetur-landing',
      script: 'dist/main.js',
      cwd: './landing',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 8081,
      },
      error_file: '/var/log/linkmetur/landing-error.log',
      out_file: '/var/log/linkmetur/landing-out.log',
      log_file: '/var/log/linkmetur/landing-combined.log',
      time: true,
      max_memory_restart: '1G',
      node_args: '--max-old-space-size=1024',
    },
  ],
};

module.exports = {
    apps: [
      {
        name: 'project-backend',
        script: './bin/www',
        instances: 0,
        exec_mode: 'cluster',
        watch: true,
        env: {
          NODE_ENV: 'production',
          PORT: '8181'
        }
      }
    ]
  };
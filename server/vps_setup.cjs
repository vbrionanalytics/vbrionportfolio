const { Client } = require('ssh2');
const conn = new Client();

const script = `
export DEBIAN_FRONTEND=noninteractive

echo "=== 1. Checking Docker & Docker Compose ==="
docker compose version || true

echo "=== 2. Cleaning DPKG Lock & Fixing Conflicts ==="
dpkg --remove --force-all docker-compose-v2 || true
dpkg --remove --force-all docker-compose || true
apt-get -f install -y

echo "=== 3. Completing Installation of Node.js, NPM, Nginx, Certbot, UFW ==="
apt-get install -y nodejs npm nginx certbot python3-certbot-nginx build-essential ufw curl wget git unzip

echo "=== 4. Verifying Node & NPM ==="
node -v
npm -v

echo "=== 5. Installing PM2 Globally ==="
npm install -g pm2

echo "=== 6. Configuring Firewall ==="
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

echo "=== 7. Enabling Nginx & Docker ==="
systemctl enable --now nginx
systemctl enable --now docker

echo "=== 8. Installing MongoDB ==="
# Check if mongodb is installed or install MongoDB
if ! command -v mongod &> /dev/null; then
  echo "Installing MongoDB Community Edition or Docker MongoDB..."
  docker run -d --name mongodb -p 27017:27017 --restart unless-stopped -v /var/lib/mongodb_data:/data/db mongo:7.0 || true
fi

echo "=== 9. Verification Summary ==="
echo "Node: $(node -v)"
echo "NPM: $(npm -v)"
echo "PM2: $(pm2 -v)"
echo "Nginx: $(nginx -v 2>&1)"
echo "Docker: $(docker -v)"
echo "Docker Compose: $(docker compose version)"

echo "=== ALL PREREQUISITES INSTALLED SUCCESSFULLY ==="
`;

console.log('Connecting to VPS 201.18.219.28 as root...');

conn.on('ready', () => {
  console.log('SSH connection established. Running setup...');
  conn.exec(script, (err, stream) => {
    if (err) throw err;
    stream.on('data', (d) => process.stdout.write(d.toString()));
    stream.stderr.on('data', (d) => process.stderr.write(d.toString()));
    stream.on('close', (code) => {
      console.log('\n[Exit code]:', code);
      conn.end();
    });
  });
}).on('error', (err) => {
  console.error('Connection error:', err);
}).connect({
  host: '201.18.219.28',
  port: 22,
  username: 'root',
  password: 'Vbrion@20-26',
  readyTimeout: 30000
});

NETWORK="$3"
if [ -z "$NETWORK" ]; then
    NETWORK="testnet"
fi
HOST="188.166.173.152" PORT="4200" yarn build:"$NETWORK"
EXPLORER_HOST="188.166.173.152" EXPLORER_PORT="4200" pm2 start /home/lionel/core-explorer/express-server.js --name explorer

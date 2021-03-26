NETWORK="$1"
if [ -z "$NETWORK" ]; then
    NETWORK="mainnet"
fi
HOST="" PORT="" yarn build:"$NETWORK"
EXPLORER_HOST="159.65.199.136(PUT YOUR IP ADDRESS)" EXPLORER_PORT="4200" pm2 start /PUT_YOUR_usernam_or_path/explorer-EDGE/express-server.js --name explorer

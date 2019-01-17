#!/bin/bash

CLEOS='cleos --url=http://nodeos --wallet-url=http://keosd'

while true; do
    echo "get_info ..."
    curl http://nodeos/v1/chain/get_info && break
    echo "wait nodeos ready ..."
    sleep 1
done

echo ""
echo "Create wallet"
$CLEOS wallet create --file=wallet.key || exit $?
echo "wallet.key:"
cat wallet.key
echo ""

echo ""
echo "wallet open"
$CLEOS wallet open || exit $?
echo ""

echo ""
echo "wallet unlock"
$CLEOS wallet unlock --password=`cat wallet.key` || exit $?
echo ""

echo ""
echo "wallet create_key"
$CLEOS wallet create_key || exit $?
$CLEOS wallet keys || exit $?
echo ""

echo ""
echo "import eosio development key "
$CLEOS wallet import --private-key=5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3
$CLEOS wallet keys || exit $?
echo ""

echo ""
echo "create account eosio testaccount"
$CLEOS create account eosio testaccount --json `$CLEOS wallet keys | jq -r '.[0]'`
echo ""

echo ""
echo "set contractt"
$CLEOS set contract testaccount /root/src/build/contract MyContract.wasm MyContract.abi
echo ""

$CLEOS push action testaccount hi '["bob"]' -p testaccount@active
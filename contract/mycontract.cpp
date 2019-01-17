#include "mycontract.hpp"

using namespace ::std;
using namespace ::eosio;
using namespace ::mycontract;

MyContract::MyContract(eosio::name receiver, eosio::name code, eosio::datastream<const char *> ds)
    : contract(receiver, code, ds),
      helloWorld(receiver, code.value)
{
}

void MyContract::hi(name user)
{
    auto hw = helloWorld.get_or_create(_self);
    print("Message: ", hw.echo(user.to_string()));
    helloWorld.set(hw, _self);
}
#include <eosiolib/eosio.hpp>
#include <eosiolib/singleton.hpp>
#include "hello_world.hpp"

namespace mycontract
{

class MyContract : public eosio::contract
{
  public:
    using eosio::contract::contract;

    MyContract(eosio::name receiver, eosio::name code, eosio::datastream<const char *> ds);

    [[eosio::action]] void hi(eosio::name user);

    eosio::singleton<"helloworld"_n, mylib::HelloWorld> helloWorld;
};

} // namespace mycontract

EOSIO_DISPATCH(mycontract::MyContract, (hi))
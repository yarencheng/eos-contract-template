#include "hello_world.hpp"

using namespace ::std;
using namespace ::mylib;

string HelloWorld::echo(const string &name) const
{
    return "Hi: " + name;
}
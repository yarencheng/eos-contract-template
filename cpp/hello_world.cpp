#include "hello_world.hpp"

#include <sstream>

using namespace ::std;
using namespace ::mylib;

string HelloWorld::echo(const string &name) const
{
    stringstream ss;
    ss << "Hi: " << name;
    return ss.str();
}
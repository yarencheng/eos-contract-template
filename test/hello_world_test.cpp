#include "hello_world.hpp"

#include "gtest/gtest.h"

using namespace ::testing;
using namespace ::std;
using namespace ::mylib;

namespace mylib::hello_world_test
{

TEST(HelloWorld, echo)
{
    // arrange

    HelloWorld h;

    // action

    string actual = h.echo("aaa");

    // assert

    EXPECT_EQ(actual, "Hi: aaa");
}

} // namespace mylib::hello_world_test
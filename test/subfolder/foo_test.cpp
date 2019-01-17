#include "subfolder/foo.hpp"

#include "gtest/gtest.h"

using namespace ::testing;
using namespace ::std;
using namespace ::mylib::subnamespace;

namespace mylib::subnamespace::foo_test
{

TEST(Foo, hi)
{
    // arrange

    Foo f;

    // action

    f.hi();

    // assert
}

} // namespace mylib::subnamespace::foo_test
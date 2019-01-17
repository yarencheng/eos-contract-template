#pragma once

#include <string>

namespace mylib
{

class HelloWorld
{
  public:
    std::string echo(const std::string &name) const;

#ifndef WORKAROUND_NOT_USE_PRIVATE
  private:
#endif
};

} // namespace demo

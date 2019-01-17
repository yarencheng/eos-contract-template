#pragma once

namespace mylib::subnamespace
{

class Foo
{
  public:
    void hi();

#ifndef WORKAROUND_NOT_USE_PRIVATE
  private:
#endif
};

} // namespace demo::subnamespace

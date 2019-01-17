cmake_minimum_required (VERSION 3.10)

subdirs(contract)

project(mylib VERSION 0.0.1 DESCRIPTION "C++ library for mylib")

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -fno-exceptions -Werror")
set(CMAKE_CXX_STANDARD 17)

include_directories( include )
file(GLOB_RECURSE SOURCE_CPP cpp/*.cpp)
file(GLOB_RECURSE TEST_CPP test/*.cpp)

##
## Librarys .so .a
##

add_library(mylib SHARED ${SOURCE_CPP})
add_library(mylib_static STATIC  ${SOURCE_CPP})
set_target_properties(mylib_static PROPERTIES OUTPUT_NAME mylib)

##
## Google Test
##

configure_file(test/CMakeLists.txt.in googletest-download/CMakeLists.txt)
execute_process(COMMAND ${CMAKE_COMMAND} -G "${CMAKE_GENERATOR}" .
  RESULT_VARIABLE result
  WORKING_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}/googletest-download )
if(result)
  message(FATAL_ERROR "CMake step for googletest failed: ${result}")
endif()
execute_process(COMMAND ${CMAKE_COMMAND} --build .
  RESULT_VARIABLE result
  WORKING_DIRECTORY ${CMAKE_CURRENT_BINARY_DIR}/googletest-download )
if(result)
  message(FATAL_ERROR "Build step for googletest failed: ${result}")
endif()

# Prevent overriding the parent project's compiler/linker
# settings on Windows
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)

# Add googletest directly to our build. This defines
# the gtest and gtest_main targets.
add_subdirectory(${CMAKE_CURRENT_BINARY_DIR}/googletest-src
                 ${CMAKE_CURRENT_BINARY_DIR}/googletest-build
                 EXCLUDE_FROM_ALL)

add_executable(mylib_test ${TEST_CPP} ${SOURCE_CPP})
target_link_libraries(mylib_test gtest_main)
enable_testing()
add_test(mylib_test mylib_test)
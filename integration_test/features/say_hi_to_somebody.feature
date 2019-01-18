Feature: Say hi to sombody
  Scenario: alan say hi
    When "alan" give his name
    Then say "Hi: alan"

  Scenario: bob say hi
    When "bob" give his name
    Then say "Message: Hi: bob"

/**
Regular expression for matching issue references.

@returns A `RegExp` for matching issue references.

@example
```
import issueRegex = require('issue-regex');

'Fixes #143 and avajs/ava#1023'.match(issueRegex());
//=> ['#143', 'avajs/ava#1023']
```
*/
declare function issueRegex(): RegExp;

export = issueRegex;

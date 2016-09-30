test-all: test-constructor test-components test-utils

test-constructor:
	node test/stamplay.js

test-components:
	node test/object.js
	node test/user.js
	node test/webhook.js
	node test/codeblock.js
	node test/query.js
	node test/stripe.js


test-utils:
	node test/request.js

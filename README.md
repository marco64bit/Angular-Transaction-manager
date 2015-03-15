<h3> install <H3>

<h4>Bower</h3>
```sh
bower install angular-transaction-manager
```

include transactionManager.js in your application

```html
 <script src="scripts/transactionManager.js"></script>
```

add transactionManager to your angular module

```js
var app = angular.module('myApp', ['transactionManager']);
```


<h3> try demo </h3>

<a href="https://jsfiddle.net/marco_pretelli/0fa6yxb6/1/"> Live demo! </a>

or Open example folder and run
<pre>
 npm install
 grunt install
 bower install
</pre>

run grunt server in example folder


<h3>Api</h3>

work only with $scope object (not with primitives) like this
```js
$scope.foo = {}
```
<br>
<b>TransactionManager.snapshot</b>
save the actual state of foo
```js
$scope.foo = {a: 1, b: "test"}
TransactionManager.snapshot($scope.foo)
```
the result object contan a key snapshot
```js 
{a: 1, b: "test", snapshot: [{a: 1, b: "test"}]}
```
you can call snapshot more then 1 time and the result object contains a list of all snapshot that you want

<br>
<b>TransactionManager.rollback</b>
return to the last snapshot status
```js
$scope.foo = {a: 1, b: "test"}
TransactionManager.snapshot($scope.foo)
$scope.foo.b = "test2" // now foo is ->  {a: 1, b: "test2"}
TransactionManager.rollback($scope.foo)
// now foo is ->  {a: 1, b: "test"}
```

<br>
<b>TransactionManager.canRollback</b>
returns true if the object was changed from the last snapshot
```js
TransactionManager.canRollback($scope.foo)
```

<br>
<b>TransactionManager.prevVersion</b>
came back to the previous snapshot.
```js
$scope.foo = {a: 1, b: "test"}
TransactionManager.snapshot($scope.foo) // now foo is -> {a: 1, b: "test"}
$scope.foo.b = "test2"
TransactionManager.snapshot($scope.foo) // now foo is -> {a: 1, b: "test2"}
TransactionManager.prevVersion($scope.foo)
// now foo is ->  {a: 1, b: "test"}
```

<br>
<b>TransactionManager.hasPrevVersion</b>
return true if foo have a previous snapshot
```js
TransactionManager.hasPrevVersion($scope.foo)
```

<br>
<b>TransactionManager.clear</b>
clear all snapshots
```js
TransactionManager.clear($scope.foo)
```
<br>
<b>TransactionManager.isTransaction</b>
return true if foo have at least 1 snapshot
```js
TransactionManager.isTransaction($scope.foo)
```

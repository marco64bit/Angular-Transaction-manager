Angular Transaction Manager
================================================
Angularjs Module that allows to make snapshots of an object, perform a rollback and restore snapshot version.

<h3>Install</h3>

<h4>Bower</h4>
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

<a href="https://jsfiddle.net/marco_pretelli/3t9agkqy/1/" target="_blank"> Live demo! </a>

or Open example folder and run
<pre>
 npm install
 grunt install
 bower install
</pre>

run grunt server in example folder


<h1>API</h1>

works only with $scope object (not with primitives) like this
```js
$scope.foo = {};
```
<br>
<b>TransactionManager.snapshot</b>
save the actual state of passed object

```js
$scope.foo = {a: 1, b: "test"};
TransactionManager.snapshot($scope.foo);
```

the result object contains a key snapshot

```js 
{a: 1, b: "test", snapshot: [{a: 1, b: "test"}]}
```

you can call snapshot() more than 1 time, the result object will contain a list of all snapshot

```js
$scope.foo = {a: 1, b: "test"};
TransactionManager.snapshot($scope.foo);
$scope.foo.b = "changed";
TransactionManager.snapshot($scope.foo);
// $scope.foo will be:
//{a: 1, b: "test", snapshot: [{a: 1, b: "test"}, {a: 1, b: "changed"}]}
```

<br>
<b>TransactionManager.rollback</b>
applies the last snapshot

```js
$scope.foo = {a: 1, b: "test"};
TransactionManager.snapshot($scope.foo);
$scope.foo.b = "test2"; // now foo is ->  {a: 1, b: "test2"}
TransactionManager.rollback($scope.foo);
// now foo is ->  {a: 1, b: "test"}
```

<br>
<b>TransactionManager.canRollback</b>
returns true in case it has a snapshot and actual state is different from last snapshot

```js
TransactionManager.canRollback($scope.foo);
```

<br>
<b>TransactionManager.canRestorePrevious</b>
return true if passed object has a previous snapshot (<b>old <del>TransactionManager.prevVersion</del></b>)

```js
TransactionManager.canRestorePrevious($scope.foo);
```

<br>
<b>TransactionManager.restorePrevious</b>
Restore to the state of previous snapshot version.

```js
$scope.foo = {a: 1, b: "test"};
TransactionManager.snapshot($scope.foo); // now foo is -> {a: 1, b: "test"}
$scope.foo.b = "test2";
TransactionManager.snapshot($scope.foo); // now foo is -> {a: 1, b: "test2"}
TransactionManager.restorePrevious($scope.foo);
// now foo is ->  {a: 1, b: "test"}
```

<br>
<b>TransactionManager.clear</b>
Remove all snapshots

```js
TransactionManager.clear($scope.foo);
```
<br>
<b>TransactionManager.hasSnapshot</b>
returns true if passed object has at least 1 snapshot

```js
TransactionManager.hasSnapshot($scope.foo);
```

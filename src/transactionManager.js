'use strict';

app.service('TransactionManager', function() {

	var doRollback = function(variable, prevVersion) {
		var tmp = angular.copy(variable);
		var snapshot_pop = variable.snapshot.pop();
		if(prevVersion) {
				tmp.snapshot.pop();
		}
		angular.forEach(variable, function(val, key) {
			if(key != "snapshot") {
				variable[key] = snapshot_pop[key];
			}
		});
		variable.snapshot = tmp.snapshot;
	}

	this.snapshot = function(variable) {
		if(!variable.snapshot) {
			variable.snapshot = [angular.copy(variable)];
		}else {
			var tmp = angular.copy(variable);
			delete tmp.snapshot;
			variable.snapshot.push(tmp);
		}
	}

	this.rollback = function(variable) {
		if(this.isTransaction(variable)) {
			doRollback(variable);
		}
	}

	this.prevVersion = function(variable) {
		if(this.isTransaction(variable)) {
			doRollback(variable, true);
			doRollback(variable);
		}
	}

	this.clear = function(variable) {
		if(this.isTransaction(variable)) {
			variable.snapshot = [];
		}
	}

	this.isTransaction = function(variable) {
		return variable.snapshot != undefined && variable.snapshot.length != 0 ? true : false
	}

	this.hasPrevVersion = function(variable) {
		if(this.isTransaction(variable)) {
			return variable.snapshot.length > 1 ? true : false;
		}
	}

	this.canRollback = function(variable) {
		if(this.isTransaction(variable)) {
			var notEquals = false;
			angular.forEach(variable, function(val, key) {
				if(key != "snapshot") {
					if(variable[key] != variable.snapshot[variable.snapshot.length -1][key]) {
						notEquals = true;
					}
				}
			});
			return notEquals;
		}
		return false;
	}

	return this;
});
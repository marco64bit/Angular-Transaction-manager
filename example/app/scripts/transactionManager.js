'use strict';
angular.module("transactionManager", []).service('TransactionManager', TransactionManager);

function TransactionManager() {
    this.snapshot           = snapshot;
    this.canRollback        = canRollback;
    this.rollback           = rollback;
    this.canRestorePrevious = canRestorePrevious;
    this.restorePrevious    = restorePrevious;
    this.hasSnapshot        = hasSnapshot;
    this.clear              = clear;

    /**
     * Perform a rollback
     *
     * @param {Object}  object
     */
    function doRollback(object) {
        var lastSnapshot = object.snapshot[object.snapshot.length - 1];

        angular.forEach(lastSnapshot, function(val, key) {
            object[key] = val;
        });
    }

    /**
     * Take a snapshot of an object
     * @param {Object}  object
     */
    function snapshot(object) {
        var tmp;

        if (!hasSnapshot(object)) { // has no snapshots yet
            object.snapshot = [angular.copy(object)];
        } else if (isChanged(object)) { // has snapshots and is changed since last version
            tmp = angular.copy(object);
            delete tmp.snapshot;
            object.snapshot.push(tmp);
        }
    }

    /**
     * Perform a rollback
     * @param object
     */
    function rollback(object) {
        if (hasSnapshot(object)) {
            doRollback(object);
        }
    }

    /**
     * Check if can restore previous
     * @param object
     * @returns {boolean}
     */
    function canRestorePrevious(object) {
        return hasSnapshot(object) && object.snapshot.length > 1;
    }

    /**
     * Restore previous snapshot
     * Resets object to state before last snapshot
     *
     * @param {Object}  object
     */
    function restorePrevious(object) {
        if (hasSnapshot(object)) {
            object.snapshot.pop();
            doRollback(object);
        }
    }

    /**
     * Remove all snapshots
     *
     * @param {Object}  object
     */
    function clear(object) {
        if (hasSnapshot(object)) {
            object.snapshot = [];
        }
    }

    /**
     * Check if passed object has a snapshot
     *
     * @param {Object} object
     * @returns {boolean}
     */
    function hasSnapshot(object) {
        return object.snapshot != undefined && object.snapshot.length != 0;
    }

    /**
     * Can perform a rollback,
     * returns true in case has a snapshot and actual state is different from last snapshot
     * @param object
     * @returns {boolean}
     */
    function canRollback(object) {
        return hasSnapshot(object) && isChanged(object);
    }

    /**
     * Check if object was changed since last snapshot
     *
     * @param {object}  object
     * @returns {boolean}
     */
    function isChanged(object) {
        var changed = false;

        angular.forEach(object, function(val, key) {
            if (key != "snapshot" && object[key] != object.snapshot[object.snapshot.length - 1][key]) {
                changed = true;
            }
        });

        return changed;
    }

    return this;
}
require.config({
    paths: {
        jquery: 'jquery-2.1.1.min'
    }
});

define("taskData", [], function() {
    "use strict";

    var STORE_NAME = "tasks";

    function saveTaskData (tasks) {
        localStorage.setItem(STORE_NAME, JSON.stringify(tasks));
    }

    function loadTaskData () {
        var storedTasks = localStorage.getItem(STORE_NAME);
        if(storedTasks) {
            return JSON.parse(storedTasks);
        }
        return [];
    }

    function clearTaskData () {
        localStorage.removeItem(STORE_NAME);
    }

    return {
        save: saveTaskData,
        load: loadTaskData,
        clear: clearTaskData
    };
});

define("taskRenderer", ["jquery", ], function ($) {

    var taskTemplate = '<li class="task"><input class="complete" type="checkbox" /> <input class="description" type="text" placeholder="Enter task description..." /> <button class="delete-button">Delete</button></li>';

    function renderTasks(tasks) {
        var elementArray = $.map(tasks, _renderTask);

        $("#task-list")
            .empty()
            .append(elementArray);
    }

    function renderNew() {
        var $taskList = $("#task-list");
        $taskList.prepend(_renderTask({}));
    }

    function _renderTask(task) {
        var $task = $(taskTemplate);
        if(task.complete) {
            $task.find(".complete").attr("checked", "checked");
        }
        $task.find(".description").val(task.description);
        return $task;
    }

    return {
        renderTasks: renderTasks,
        renderNew: renderNew
    };
});

define("tasks", ["jquery", "taskData", "taskRenderer"], function ($, taskData, taskRenderer) {

    function add() {
        taskRenderer.renderNew();
    }

    function remove(clickEvent) {
        var taskElement = clickEvent.target;
        $(taskElement).closest(".task").remove();
    }

    function clear() {
        taskData.clear();
        render();
    }

    function save() {
        var tasks = [];
        $("#task-list .task").each(function (index, task) {
            var $task = $(task);
            tasks.push({
                complete: $task.find(".complete").prop('checked'),
                description: $task.find(".description").val()
            });
        });

        taskData.save(tasks);
    }

    function cancel() {
        render();
    }

    function render() {
        taskRenderer.renderTasks(taskData.load());
    }

    return {
        add: add,
        remove: remove,
        clear: clear,
        save: save,
        cancel: cancel,
        render: render
    };
});

define("app", ["jquery", "tasks"], function ($, tasks) {
    function _addTask() {
        tasks.add();
    }

    function _deleteAllTasks() {
        tasks.clear();
    }

    function _saveChanges() {
        tasks.save();
    }

    function _cancelChanges() {
        tasks.cancel();
    }

    function _deleteTask(clickEvent) {
        tasks.remove(clickEvent);
    }

    function _registerEventHandlers() {
        $("#new-task-button").on("click", _addTask);
        $("#delete-all-button").on("click", _deleteAllTasks);
        $("#save-button").on("click", _saveChanges);
        $("#cancel-button").on("click", _cancelChanges);
        $("#task-list").on("click", ".delete-button", _deleteTask);
    }

    return {
        init: function () {
            _registerEventHandlers();
            tasks.render();
        }
    }
});

require(["app"], function (app) {
    app.init();
});
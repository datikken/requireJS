define(["jquery", "data/taskData", "renderers/taskRenderer"], function ($, taskData, taskRenderer) {

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
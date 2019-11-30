define(["jquery", "hbs!templates/taskTemplate"], function ($, taskTemplate) {

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
        var $task = $(taskTemplate(task));
        return $task;
    }

    return {
        renderTasks: renderTasks,
        renderNew: renderNew
    };
});
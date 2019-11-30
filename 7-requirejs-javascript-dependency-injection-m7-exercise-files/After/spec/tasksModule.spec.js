describe("The taskModule", function () {

    var injector;

    beforeEach(function (done) {
        require(["Squire"], function (Squire) {
            injector = new Squire();
            done();
        });
    });

    afterEach(function () {
        injector.remove();
    });


    describe("add function", function () {
        it("calls taskRenderer.renderNew", function (done) {
            injector.mock("renderers/taskRenderer", {
                renderNew: function () {}
            });

            injector.mock("data/taskData", {});

            injector.require(["tasks", "renderers/taskRenderer"],
            	function (tasks, taskRenderer) {
	            	spyOn(taskRenderer, "renderNew");
	                tasks.add();
	                expect(taskRenderer.renderNew).toHaveBeenCalled();
	                done();
	            },
	            function (error) {
	            	done.error(error);
	            });
        });
    });
});
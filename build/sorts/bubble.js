var Bubble;
(function (Bubble_1) {
    var Bubble = (function () {
        function Bubble(board) {
            this.board = board;
            this.title = "Bubble Sort";
            this.done = false;
            this.ordered = true;
            this.length = board.length;
            this.baseNode = 0;
            this.comparisonNode = 1;
        }
        Bubble.prototype.currentNodes = function () {
            return [this.baseNode, this.comparisonNode];
        };
        Bubble.prototype.nodesInOrder = function (values) {
            var inOrder = values[this.baseNode] < values[this.comparisonNode];
            if (!inOrder) {
                this.ordered = false;
            }
            return inOrder;
        };
        Bubble.prototype.setUpNext = function () {
            this.baseNode++;
            this.comparisonNode++;
            if (this.comparisonNode == this.length) {
                if (this.ordered) {
                    this.done = true;
                }
                else {
                    this.ordered = true;
                }
                this.baseNode = 0;
                this.comparisonNode = 1;
            }
        };
        Bubble.prototype.next = function () {
            if (this.done) {
                return [];
            }
            var currentNodes = this.currentNodes();
            var values = this.board.values();
            if (!this.nodesInOrder(values)) {
                this.board.swap.apply(this.board, currentNodes);
            }
            this.setUpNext();
            return currentNodes;
        };
        return Bubble;
    }());
    Bubble_1.Bubble = Bubble;
})(Bubble || (Bubble = {}));

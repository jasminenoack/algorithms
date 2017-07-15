var script;
(function (script) {
    var $boards = document.getElementById("boards");
    var $create = document.getElementById("create");
    var boxHeight = 400;
    var boxWidth = 400;
    var autoInterval = null;
    var boardList = [];
    var sizes = [
        Sizes.xXSmall,
        Sizes.xSmall,
        Sizes.small,
        Sizes.medium,
        Sizes.large,
        Sizes.xLarge,
        Sizes.xXLarge
    ];
    var valueTypes = [
        Boards.ValueType.Integers,
        Boards.ValueType.FewUnique,
        Boards.ValueType.Random
    ];
    var sorts = [
        Bubble.Bubble
    ];
    // set up orders
    var orders = Shuffles.ShuffleList;
    var orderSelect = document.getElementById('order');
    orders.forEach(function (shuffle, index) {
        var optionElement = document.createElement('option');
        optionElement.value = index;
        optionElement.textContent = shuffle.title;
        orderSelect.appendChild(optionElement);
    });
    // when click create
    $create.addEventListener('click', function () {
        var $size = document.getElementById("size");
        var size = sizes[$size.value];
        var $valueType = document.getElementById("value-type");
        var value = valueTypes[$valueType.value];
        var $order = document.getElementById("order");
        var order = orders[$order.value];
        var $sort = document.getElementById("sort");
        var Sort = sorts[$sort.value];
        // let board = new Boards.Board(size)
        var board = new Boards.Board(size, order, value);
        boardList.push({
            board: board,
            sort: new Sort(board)
        });
        createBoard(boardList.length - 1);
    });
    function reRenderPoint(pointElements, board, index) {
        var value = board.get(index).value;
        var valueMin = board.min();
        var valueMax = board.max();
        var heightCount = valueMax - valueMin + 1;
        var valueHeight = boxHeight / heightCount;
        var bottom = (value - valueMin) * valueHeight;
        var point = pointElements[index];
        point.style.bottom = bottom + "px";
    }
    function setCurrentNodes(currentNodes, pointElements) {
        currentNodes.forEach(function (index) {
            pointElements[index].classList.add("active");
        });
    }
    function removeCurrentNodes(currentNodes, pointElements) {
        currentNodes.forEach(function (index) {
            pointElements[index].classList.remove("active");
        });
    }
    function step() {
        var _loop_1 = function (i) {
            var currentNodes = void 0;
            var boardData = boardList[i];
            var sort = boardData.sort;
            var board = boardData.board;
            var boardElement = document.getElementsByClassName('board')[i];
            var pointElements = boardElement.getElementsByClassName('point');
            currentNodes = sort.currentNodes();
            removeCurrentNodes(currentNodes, pointElements);
            var points = sort.next();
            points.forEach(function (point) {
                reRenderPoint(pointElements, board, point);
            });
            currentNodes = sort.currentNodes();
            setCurrentNodes(currentNodes, pointElements);
            boardElement.closest('.wrapper').getElementsByClassName('step-count')[0].textContent = "steps: " + sort.steps;
        };
        for (var i = 0; i < boardList.length; i++) {
            _loop_1(i);
        }
    }
    var $step = document.getElementById("step");
    $step.addEventListener('click', step);
    function createBoard(index) {
        var board = boardList[index].board;
        var sort = boardList[index].sort;
        var $el = document.createElement('div');
        $el.className = 'board';
        $el.style.height = boxHeight + "px";
        $el.style.width = boxWidth + "px";
        var values = board.values();
        var valueMin = board.min();
        var valueMax = board.max();
        var widthCount = values.length;
        var heightCount = valueMax - valueMin + 1;
        var valueHeight = boxHeight / heightCount;
        var valueWidth = boxWidth / widthCount;
        var currentNodes = sort.currentNodes();
        for (var i = 0; i < values.length; i++) {
            var value = values[i];
            var left = i * valueWidth;
            var bottom = (value - valueMin) * valueHeight;
            var $child = document.createElement('span');
            $child.className = 'point';
            if (currentNodes.indexOf(i) !== -1) {
                $child.classList.add("active");
            }
            $child.style.height = valueHeight + "px";
            $child.style.width = valueWidth + "px";
            $child.style.bottom = bottom + "px";
            $child.style.left = left + "px";
            $el.appendChild($child);
        }
        var $wrapper = document.createElement('div');
        $wrapper.className = 'wrapper';
        var $header = document.createElement('h1');
        $header.textContent = sort.title;
        $wrapper.appendChild($header);
        var $stepCount = document.createElement('span');
        $stepCount.textContent = "steps: " + sort.steps;
        $stepCount.className = 'step-count';
        $wrapper.appendChild($stepCount);
        var $button = document.createElement('button');
        $button.textContent = 'Remove';
        $button.className = 'remove';
        $wrapper.appendChild($button);
        $wrapper.appendChild($el);
        $boards.appendChild($wrapper);
    }
    function createDelegatedEvent(eventNode, eventType, fun, selector) {
        var listener = eventNode.addEventListener(eventType, function (event) {
            var currentTarget = event.target;
            if (event.target.matches(selector)) {
                fun(event, event.target);
            }
        });
        return listener;
    }
    function closestParent(node, selector) {
        if (node.matches(selector)) {
            return node;
        }
        else if (!node.parentElement) {
            return null;
        }
        else {
            return closestParent(node.parentElement, selector);
        }
    }
    createDelegatedEvent($boards, 'click', function (event, target) {
        var $wrapper = closestParent(target, '.wrapper');
        var wrappers = document.getElementsByClassName('wrapper');
        for (var i = 0; i < wrappers.length; i++) {
            if (wrappers[i] === $wrapper) {
                boardList.splice(i, 1);
                break;
            }
        }
        $wrapper.remove();
    }, '.remove');
    var $auto = document.getElementById("auto");
    $auto.addEventListener('click', function (event) {
        if (autoInterval) {
            clearInterval(autoInterval);
            autoInterval = null;
            event.currentTarget.classList.remove('active');
        }
        else {
            autoInterval = setInterval(step, 200);
            event.currentTarget.classList.add('active');
        }
    });
})(script || (script = {}));

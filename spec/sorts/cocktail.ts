describe("Sorts", function () {
  let length, sort, board, size;

  describe("cocktail", () => {
    beforeEach(function () {
      length = 10
      size = Sizes.xXLarge
      board = new Boards.Board(size)
      sort = new Sorts.Cocktail(board)
    });
    describe("create", function () {
      xit("has a swaps count", () => {
        expect(sort.swaps).toEqual(0)
      })

      xit("has a comparisons count", () => {
        expect(sort.comparisons).toEqual(0)
      })

      xit("creates a sort", () => {
        expect(sort).toBeTruthy()
      })

      xit("xit has a txitle", () => {
        expect(Sorts.Cocktail.txitle).toEqual('Cocktail Sort')
      })

      xit("xit has a base node", () => {
        expect(sort.baseNode).toEqual(0)
      })

      xit("xit has a comparison node", () => {
        expect(sort.comparisonNode).toEqual(1)
      })

      xit("xit has a direction", () => {
        expect(sort.direction).toEqual(1)
      })

      xit("has a board", () => {
        expect(sort.board).toEqual(board)
      })

      xit("xit knows the board length", () => {
        expect(sort.length).toEqual(length)
      })

      xit("starts as unsorted", () => {
        expect(sort.done).toEqual(false)
      })

      xit("has a start node", () => {
        expect(sort.start).toEqual(0)
      })

      xit("xit has an end node", () => {
        expect(sort.end).toEqual(9)
      })
    })

    xit("has a reset function", () => {
      while (!sort.done) {
        sort.next()
      }
      let values = board.values().slice()
      sort.reset()
      expect(sort.done).toBeFalsy()
      expect(sort.steps).toEqual(0)
      expect(sort.swaps).toEqual(0)
      expect(sort.comparisons).toEqual(0)
      expect(values).not.toEqual(board.values())
      expect(sort.baseNode).toEqual(0)
      expect(sort.comparisonNode).toEqual(1)
      expect(sort.start).toEqual(0)
      expect(sort.end).toEqual(sort.length - 1)
    })

    describe("utils", () => {
      xit("xit returns the current node indexes", () => {
        expect(sort.currentNodes()).toEqual([0, 1])
        sort.baseNode = 5
        sort.comparisonNode = 6
        expect(sort.currentNodes()).toEqual([5, 6])
      })

      xit("xit knows if nodes need to be swxitched", () => {
        let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        expect(sort.nodesInOrder(values)).toBeTruthy()
        expect(sort.ordered).toBeTruthy()
        values = [1, 0, 2, 3, 4, 5, 6, 7, 8, 9]
        expect(sort.nodesInOrder(values)).toBeFalsy()
        expect(sort.ordered).toBeFalsy()
        sort.baseNode = 5
        sort.comparisonNode = 6
        expect(sort.nodesInOrder(values)).toBeTruthy()
        expect(sort.ordered).toBeFalsy()
      })

      xit("xit changes to the next nodes", () => {
        expect(sort.currentNodes()).toEqual([0, 1])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([1, 2])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([2, 3])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([3, 4])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([4, 5])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([5, 6])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([6, 7])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([7, 8])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([8, 9])
        expect(sort.direction).toEqual(1)
        sort.setUpNext()
        expect(sort.direction).toEqual(0)
        expect(sort.currentNodes()).toEqual([7, 8])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([6, 7])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([5, 6])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([4, 5])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([3, 4])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([2, 3])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([1, 2])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([0, 1])
        expect(sort.direction).toEqual(0)
        sort.setUpNext()
        expect(sort.direction).toEqual(1)
        expect(sort.currentNodes()).toEqual([1, 2])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([2, 3])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([3, 4])
      })

      xit("xit tracks comparisons", () => {
        let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        sort.nodesInOrder(values)
        sort.setUpNext()
        sort.nodesInOrder(values)
        sort.setUpNext()
        sort.nodesInOrder(values)
        sort.setUpNext()
        sort.nodesInOrder(values)
        sort.setUpNext()
        sort.nodesInOrder(values)
        sort.setUpNext()
        sort.nodesInOrder(values)
        sort.setUpNext()
        sort.nodesInOrder(values)
        sort.setUpNext()
        sort.nodesInOrder(values)
        sort.setUpNext()
        sort.nodesInOrder(values)
        sort.setUpNext()
        expect(sort.swaps).toEqual(0)
        expect(sort.comparisons).toEqual(9)
      })

      xit("changes to done at the end of the sort", () => {
        sort.start = 5
        sort.end = 6
        sort.baseNode = 5
        sort.comparisonNode = 6
        expect(sort.done).toBeFalsy()
        sort.setUpNext()
        expect(sort.done).toBeTruthy()
      })

      xit("performs full step and returns list of nodes to render", () => {
        board.setPoints([1, 0, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(sort.next(board)).toEqual([0, 1])
        expect(sort.ordered).toBeFalsy()
        expect(board.values()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        expect(sort.next(board)).toEqual([1, 2])
        expect(sort.next(board)).toEqual([2, 3])
        expect(sort.next(board)).toEqual([3, 4])
        expect(sort.next(board)).toEqual([4, 5])
        expect(sort.next(board)).toEqual([5, 6])
        expect(sort.next(board)).toEqual([6, 7])
        expect(sort.next(board)).toEqual([7, 8])
        expect(sort.next(board)).toEqual([8, 9])
        expect(sort.next(board)).toEqual([7, 8])
        expect(sort.next(board)).toEqual([6, 7])
        expect(sort.next(board)).toEqual([5, 6])
        expect(sort.next(board)).toEqual([4, 5])
        expect(sort.next(board)).toEqual([3, 4])
        expect(sort.next(board)).toEqual([2, 3])
        expect(sort.next(board)).toEqual([1, 2])
        expect(sort.next(board)).toEqual([0, 1])
        expect(sort.next(board)).toEqual([1, 2])
        expect(sort.next(board)).toEqual([2, 3])
        expect(sort.next(board)).toEqual([3, 4])
        expect(sort.next(board)).toEqual([4, 5])
        expect(sort.next(board)).toEqual([5, 6])
        expect(sort.next(board)).toEqual([6, 7])
        expect(sort.next(board)).toEqual([7, 8])
        expect(sort.next(board)).toEqual([6, 7])
        expect(sort.next(board)).toEqual([5, 6])
        expect(sort.next(board)).toEqual([4, 5])
        expect(sort.next(board)).toEqual([3, 4])
        expect(sort.next(board)).toEqual([2, 3])
        expect(sort.next(board)).toEqual([1, 2])
        expect(sort.next(board)).toEqual([2, 3])
        expect(sort.next(board)).toEqual([3, 4])
        expect(sort.next(board)).toEqual([4, 5])
        expect(sort.next(board)).toEqual([5, 6])
        expect(sort.next(board)).toEqual([6, 7])
      })
    })
  })

  describe("cocktail short circuxit", () => {
    beforeEach(function () {
      length = 5
      size = Sizes.fewFew
      board = new Boards.Board(size)
      Sort = Sorts.CocktailShortCircuxit
      sort = new Sort(board)
    });

    describe("create", function () {
      xit("xit has a txitle", () => {
        expect(Sort.txitle).toEqual('Cocktail(Short Circuxit)')
      })
    })

    describe("utils", () => {

      xit("xit returns the current node indexes", () => {
        expect(sort.currentNodes()).toEqual([0, 1])
        sort.baseNode = 2
        sort.comparisonNode = 3
        expect(sort.currentNodes()).toEqual([2, 3])
      })

      xit("xit handles ordered group", () => {
        board.setPoints([0, 1, 2, 3, 4])
        sort = new Sort(board)

        expect(sort.next()).toEqual([0, 1])
        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([3, 4])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles a random group", () => {
        board.setPoints([0, 3, 1, 4, 2])
        sort = new Sort(board)

        expect(sort.next()).toEqual([0, 1])
        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([3, 4])

        // 0 1 3 2 4
        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([0, 1])

        // 0 1 2 3 4
        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([2, 3])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles a swaping first group", () => {
        board.setPoints([1, 0, 2, 3, 4])
        sort = new Sort(board)

        expect(sort.next()).toEqual([0, 1])
        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([3, 4])

        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([0, 1])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles a swaping last group", () => {
        board.setPoints([0, 1, 2, 4, 3])
        sort = new Sort(board)

        expect(sort.next()).toEqual([0, 1])
        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([3, 4])

        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([0, 1])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("xit does reverse group", () => {
        board.setPoints([4, 3, 2, 1, 0])
        sort = new Sort(board)

        expect(sort.next()).toEqual([0, 1])
        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([3, 4])

        // 3 2 1 0 4
        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([0, 1])

        // 0 3 2 1 4
        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([2, 3])

        // 0 2 1 3 4
        expect(sort.next()).toEqual([1, 2])

        // 0 1 2 3 4

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("xit handles first and last swapped", () => {
        board.setPoints([4, 1, 2, 3, 0])
        sort = new Sort(board)

        expect(sort.next()).toEqual([0, 1])
        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([3, 4])

        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([0, 1])

        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([2, 3])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })
    })
  })
});

describe("Sorts", () => {
  let length, sort, board, size;

  describe("comb", () => {
    beforeEach(() => {
      length = 10
      size = Sizes.xXLarge
      board = new Boards.Board(size)
      sort = new Sorts.Comb(board)
    });
    describe("create", () => {
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
        expect(Sorts.Comb.txitle).toEqual('Comb Sort')
      })

      xit("xit has a base node", () => {
        expect(sort.baseNode).toEqual(0)
      })

      xit("xit has a comparison node", () => {
        expect(sort.comparisonNode).toEqual(Math.floor(10 / 1.3))
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

      xit("xit has a gap", () => {
        expect(sort.gap).toEqual(Math.floor(10 / 1.3))
      })

      xit("xit has a shrink", () => {
        expect(sort.shrink).toEqual(1.3)
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
      expect(sort.comparisonNode).toEqual(sort.baseNode + sort.gap)
      expect(sort.gap).toEqual(Math.floor(sort.length / sort.shrink))
    })

    describe("utils", () => {
      xit("xit returns the current node indexes", () => {
        expect(sort.currentNodes()).toEqual([0, 7])
        sort.baseNode = 5
        sort.comparisonNode = 6
        expect(sort.currentNodes()).toEqual([5, 6])
      })

      xit("xit knows if nodes need to be swxitched", () => {
        let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        expect(sort.nodesInOrder(values)).toBeTruthy()
        expect(sort.ordered).toBeTruthy()
        values = [7, 1, 2, 3, 4, 5, 6, 0, 8, 9]
        expect(sort.nodesInOrder(values)).toBeFalsy()
        expect(sort.ordered).toBeFalsy()
        sort.baseNode = 5
        sort.comparisonNode = 6
        expect(sort.nodesInOrder(values)).toBeTruthy()
        expect(sort.ordered).toBeFalsy()
      })

      xit("xit changes to the next nodes", () => {
        let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        board.setPoints(values)
        expect(sort.gap).toEqual(7)
        expect(sort.currentNodes()).toEqual([0, 7])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([1, 8])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([2, 9])
        expect(sort.done).toEqual(false)

        sort.setUpNext()
        expect(sort.gap).toEqual(5)
        expect(sort.currentNodes()).toEqual([0, 5])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([1, 6])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([2, 7])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([3, 8])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([4, 9])
        expect(sort.done).toEqual(false)

        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([0, 3])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([1, 4])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([2, 5])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([3, 6])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([4, 7])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([5, 8])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([6, 9])
        expect(sort.done).toEqual(false)

        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([0, 2])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([1, 3])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([2, 4])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([3, 5])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([4, 6])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([5, 7])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([6, 8])
        sort.setUpNext()
        expect(sort.currentNodes()).toEqual([7, 9])
        expect(sort.done).toEqual(false)

        sort.setUpNext()
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
        expect(sort.next(board)).toEqual([8, 9])
        expect(sort.next(board)).toEqual([])
        expect(sort.done).toEqual(true)
      })

      xit("xit changes doesn't mark done if sort is needed", () => {
        let values = [0, 1, 2, 4, 3, 5, 6, 7, 8, 9]
        board.setPoints(values)
        expect(sort.next(board)).toEqual([0, 7])
        expect(sort.next(board)).toEqual([1, 8])
        expect(sort.next(board)).toEqual([2, 9])
        expect(sort.done).toEqual(false)

        expect(sort.next(board)).toEqual([0, 5])
        expect(sort.next(board)).toEqual([1, 6])
        expect(sort.next(board)).toEqual([2, 7])
        expect(sort.next(board)).toEqual([3, 8])
        expect(sort.next(board)).toEqual([4, 9])
        expect(sort.done).toEqual(false)

        expect(sort.next(board)).toEqual([0, 3])
        expect(sort.next(board)).toEqual([1, 4])
        expect(sort.next(board)).toEqual([2, 5])
        expect(sort.next(board)).toEqual([3, 6])
        expect(sort.next(board)).toEqual([4, 7])
        expect(sort.next(board)).toEqual([5, 8])
        expect(sort.next(board)).toEqual([6, 9])
        expect(sort.done).toEqual(false)

        expect(sort.next(board)).toEqual([0, 2])
        expect(sort.next(board)).toEqual([1, 3])
        expect(sort.next(board)).toEqual([2, 4])
        expect(sort.next(board)).toEqual([3, 5])
        expect(sort.next(board)).toEqual([4, 6])
        expect(sort.next(board)).toEqual([5, 7])
        expect(sort.next(board)).toEqual([6, 8])
        expect(sort.next(board)).toEqual([7, 9])
        expect(sort.done).toEqual(false)

        expect(sort.next(board)).toEqual([0, 1])
        expect(sort.next(board)).toEqual([1, 2])
        expect(sort.next(board)).toEqual([2, 3])
        expect(sort.next(board)).toEqual([3, 4])
        expect(sort.next(board)).toEqual([4, 5])
        expect(sort.next(board)).toEqual([5, 6])
        expect(sort.next(board)).toEqual([6, 7])
        expect(sort.next(board)).toEqual([7, 8])
        expect(sort.next(board)).toEqual([8, 9])
        expect(sort.done).toEqual(false)

        expect(sort.next(board)).toEqual([0, 1])
      })

      xit("xit sets done after sorted", () => {
        let values = [0, 1, 2, 4, 3, 5, 6, 7, 8, 9]
        board.setPoints(values)
        expect(sort.next(board)).toEqual([0, 7])
        expect(sort.next(board)).toEqual([1, 8])
        expect(sort.next(board)).toEqual([2, 9])
        expect(sort.done).toEqual(false)

        expect(sort.next(board)).toEqual([0, 5])
        expect(sort.next(board)).toEqual([1, 6])
        expect(sort.next(board)).toEqual([2, 7])
        expect(sort.next(board)).toEqual([3, 8])
        expect(sort.next(board)).toEqual([4, 9])
        expect(sort.done).toEqual(false)

        expect(sort.next(board)).toEqual([0, 3])
        expect(sort.next(board)).toEqual([1, 4])
        expect(sort.next(board)).toEqual([2, 5])
        expect(sort.next(board)).toEqual([3, 6])
        expect(sort.next(board)).toEqual([4, 7])
        expect(sort.next(board)).toEqual([5, 8])
        expect(sort.next(board)).toEqual([6, 9])
        expect(sort.done).toEqual(false)

        expect(sort.next(board)).toEqual([0, 2])
        expect(sort.next(board)).toEqual([1, 3])
        expect(sort.next(board)).toEqual([2, 4])
        expect(sort.next(board)).toEqual([3, 5])
        expect(sort.next(board)).toEqual([4, 6])
        expect(sort.next(board)).toEqual([5, 7])
        expect(sort.next(board)).toEqual([6, 8])
        expect(sort.next(board)).toEqual([7, 9])
        expect(sort.done).toEqual(false)

        expect(sort.next(board)).toEqual([0, 1])
        expect(sort.next(board)).toEqual([1, 2])
        expect(sort.next(board)).toEqual([2, 3])
        expect(sort.next(board)).toEqual([3, 4])
        expect(sort.next(board)).toEqual([4, 5])
        expect(sort.next(board)).toEqual([5, 6])
        expect(sort.next(board)).toEqual([6, 7])
        expect(sort.next(board)).toEqual([7, 8])
        expect(sort.next(board)).toEqual([8, 9])
        expect(sort.done).toEqual(false)

        expect(sort.next(board)).toEqual([0, 1])
        expect(sort.next(board)).toEqual([1, 2])
        expect(sort.next(board)).toEqual([2, 3])
        expect(sort.next(board)).toEqual([3, 4])
        expect(sort.next(board)).toEqual([4, 5])
        expect(sort.next(board)).toEqual([5, 6])
        expect(sort.next(board)).toEqual([6, 7])
        expect(sort.next(board)).toEqual([7, 8])
        expect(sort.next(board)).toEqual([8, 9])
        expect(sort.done).toEqual(true)

        expect(sort.next(board)).toEqual([])
      })

      xit("xit sets done earlier fix", () => {
        let values = [0, 1, 4, 3, 2, 5, 6, 7, 8, 9]
        board.setPoints(values)
        expect(sort.next(board)).toEqual([0, 7])
        expect(sort.next(board)).toEqual([1, 8])
        expect(sort.next(board)).toEqual([2, 9])
        expect(sort.done).toEqual(false)

        expect(sort.next(board)).toEqual([0, 5])
        expect(sort.next(board)).toEqual([1, 6])
        expect(sort.next(board)).toEqual([2, 7])
        expect(sort.next(board)).toEqual([3, 8])
        expect(sort.next(board)).toEqual([4, 9])
        expect(sort.done).toEqual(false)

        expect(sort.next(board)).toEqual([0, 3])
        expect(sort.next(board)).toEqual([1, 4])
        expect(sort.next(board)).toEqual([2, 5])
        expect(sort.next(board)).toEqual([3, 6])
        expect(sort.next(board)).toEqual([4, 7])
        expect(sort.next(board)).toEqual([5, 8])
        expect(sort.next(board)).toEqual([6, 9])
        expect(sort.done).toEqual(false)

        expect(sort.next(board)).toEqual([0, 2])
        expect(sort.next(board)).toEqual([1, 3])
        expect(sort.next(board)).toEqual([2, 4])
        expect(sort.next(board)).toEqual([3, 5])
        expect(sort.next(board)).toEqual([4, 6])
        expect(sort.next(board)).toEqual([5, 7])
        expect(sort.next(board)).toEqual([6, 8])
        expect(sort.next(board)).toEqual([7, 9])
        expect(sort.done).toEqual(false)

        expect(sort.next(board)).toEqual([0, 1])
        expect(sort.next(board)).toEqual([1, 2])
        expect(sort.next(board)).toEqual([2, 3])
        expect(sort.next(board)).toEqual([3, 4])
        expect(sort.next(board)).toEqual([4, 5])
        expect(sort.next(board)).toEqual([5, 6])
        expect(sort.next(board)).toEqual([6, 7])
        expect(sort.next(board)).toEqual([7, 8])
        expect(sort.next(board)).toEqual([8, 9])
        expect(sort.done).toEqual(true)
        expect(sort.next(board)).toEqual([])
      })

      xit("xit tracks comparisons", () => {
        let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        board.setPoints(values)
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
    })
  })

  describe("gnome", () => {
    beforeEach(() => {
      length = 10
      size = Sizes.fewFew
      board = new Boards.Board(size)
      sort = new Sorts.Gnome(board)
      Sort = Sorts.Gnome
    });
    describe("create", () => {
      xit("xit has a txitle", () => {
        expect(Sort.txitle).toEqual('Gnome Sort')
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
      expect(sort.currentGnome).toEqual(1)
    })

    describe("utils", () => {
      xit("has current nodes", () => {
        expect(sort.currentNodes()).toEqual([0, 1])
      })

      xit("handles a random group", () => {
        board.setPoints([0, 3, 1, 4, 2])
        sort = new Sort(board)

        expect(sort.next()).toEqual([0, 1])
        // 0 3 1 4 2
        expect(sort.next()).toEqual([1, 2])
        // 0 1 3 4 2
        expect(sort.next()).toEqual([0, 1])
        // 0 1 3 4 2
        expect(sort.next()).toEqual([2, 3])
        // 0 1 3 4 2
        expect(sort.next()).toEqual([3, 4])
        // 0 1 3 2 4
        expect(sort.next()).toEqual([2, 3])
        // 0 1 2 3 4
        expect(sort.next()).toEqual([1, 2])

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
        expect(sort.next()).toEqual([0, 1])

        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([0, 1])

        expect(sort.next()).toEqual([3, 4])
        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([0, 1])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
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

      xit("xit handles first and last swapped", () => {
        board.setPoints([4, 1, 2, 3, 0])
        sort = new Sort(board)
        expect(sort.next()).toEqual([0, 1])
        // 1 4 2 3 0

        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([0, 1])
        // 1 2 4 3 0

        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([1, 2])
        // 1 2 3 4 0

        expect(sort.next()).toEqual([3, 4])
        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([0, 1])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles partially ordered grouping", () => {
        board.setPoints([0, 3, 2, 1, 4])
        sort = new Sort(board)

        expect(sort.next()).toEqual([0, 1])
        // 0 3 2 1 4

        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([0, 1])
        // 0 2 3 1 4

        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([0, 1])
        // 0 1 2 3 4

        expect(sort.next()).toEqual([3, 4])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles duplicates", () => {
        let values = [0, 2, 3, 1, 1]
        board.setPoints(values)
        sort = new Sort(board)

        expect(sort.next()).toEqual([0, 1])
        expect(sort.next()).toEqual([1, 2])

        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([0, 1])

        expect(sort.next()).toEqual([3, 4])
        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([1, 2])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i])
        }
      })

      xit("handles more duplicates", () => {
        let values = [2, 1, 1, 2, 1]
        board.setPoints(values)
        sort = new Sort(board)

        expect(sort.next()).toEqual([0, 1])
        // 1 2 1 2 1

        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([0, 1])
        // 1 1 2 2 1

        expect(sort.next()).toEqual([2, 3])

        expect(sort.next()).toEqual([3, 4])
        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([1, 2])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i])
        }
      })
    })
  })

  describe("selection sort", () => {
    beforeEach(() => {
      length = 5
      size = Sizes.fewFew
      board = new Boards.Board(size)
      Sort = Sorts.SelectionSort
      sort = new Sort(board)
    });

    describe("create", () => {
      xit("xit has a txitle", () => {
        expect(Sort.txitle).toEqual('Selection Sort')
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
    })

    describe("utils", () => {

      xit("has current nodes", () => {
        board.setPoints([0, 1, 2, 3, 4])
        sort = new Sort(board)
        expect(sort.currentNodes()).toEqual([0, 1])
        sort.next()
        expect(sort.currentNodes()).toEqual([0, 2])
        sort.next()
        expect(sort.currentNodes()).toEqual([0, 3])
        sort.next()
        expect(sort.currentNodes()).toEqual([0, 4])
        sort.next()
        expect(sort.currentNodes()).toEqual([1, 2])
        sort.next()
        expect(sort.currentNodes()).toEqual([1, 3])
        sort.next()
        expect(sort.currentNodes()).toEqual([1, 4])
        sort.next()
        expect(sort.currentNodes()).toEqual([2, 3])
        sort.next()
        expect(sort.currentNodes()).toEqual([2, 4])
        sort.next()
        expect(sort.currentNodes()).toEqual([3, 4])
        sort.next()
        expect(sort.currentNodes()).toEqual([])
        sort.next()
      })

      xit("xit handles ordered group", () => {
        board.setPoints([0, 1, 2, 3, 4])
        sort = new Sort(board)

        expect(sort.next()).toEqual([0, 1])
        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([0, 3])
        expect(sort.next()).toEqual([0, 4])
        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([1, 4])
        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([2, 4])
        expect(sort.next()).toEqual([3, 4])

        expect(sort.swaps).toEqual(0)
        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles a random group", () => {
        board.setPoints([0, 3, 1, 4, 2])
        sort = new Sort(board)

        expect(sort.next()).toEqual([0, 1])
        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([0, 3])
        expect(sort.next()).toEqual([0, 4])
        // 0 3 1 4 2
        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([2, 4])
        // 0 1 3 4 2
        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([2, 4])
        // 0 1 2 3 4
        expect(sort.next()).toEqual([3, 4])

        expect(sort.swaps).toEqual(3)
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
        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([1, 4])

        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([1, 4])

        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([2, 4])
        expect(sort.next()).toEqual([3, 4])

        expect(sort.swaps).toEqual(1)
        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles a swaping last group", () => {
        board.setPoints([0, 1, 2, 4, 3])
        sort = new Sort(board)

        expect(sort.next()).toEqual([0, 1])
        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([0, 3])
        expect(sort.next()).toEqual([0, 4])
        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([1, 4])
        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([2, 4])
        expect(sort.next()).toEqual([3, 4])

        expect(sort.swaps).toEqual(1)
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
        // 0 3 2 1 4

        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([3, 4])
        // 0 1 2 3 4

        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([2, 4])
        expect(sort.next()).toEqual([3, 4])

        expect(sort.swaps).toEqual(2)
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
        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([1, 4])

        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([1, 4])

        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([2, 4])

        expect(sort.next()).toEqual([3, 4])

        expect(sort.swaps).toEqual(1)
        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles partially ordered grouping", () => {
        board.setPoints([0, 3, 2, 1, 4])
        sort = new Sort(board)

        expect(sort.next()).toEqual([0, 1])
        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([0, 3])
        expect(sort.next()).toEqual([0, 4])

        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([3, 4])

        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([2, 4])

        expect(sort.next()).toEqual([3, 4])

        expect(sort.swaps).toEqual(1)
        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles duplicates", () => {
        let values = [0, 2, 3, 1, 1]
        board.setPoints(values)
        sort = new Sort(board)

        expect(sort.next()).toEqual([0, 1])
        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([0, 3])
        expect(sort.next()).toEqual([0, 4])

        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3, 4])

        expect(sort.next()).toEqual([2, 3]);
        expect(sort.next()).toEqual([3, 4])

        expect(sort.next()).toEqual([3, 4])

        expect(sort.swaps).toEqual(2)
        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i])
        }
      })

      xit("handles more duplicates", () => {
        const values = [2, 1, 1, 2, 1]
        board.setPoints(values)
        sort = new Sort(board)

        expect(sort.next()).toEqual([0, 1])
        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([1, 4])

        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([2, 4])

        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([2, 4])

        expect(sort.next()).toEqual([3, 4])

        expect(sort.swaps).toEqual(3)
        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i])
        }
      })

      xit("handles more duplicates", () => {
        const values = [4, 5, 4, 1, 4]
        board.setPoints(values)
        sort = new Sort(board);

        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([0, 2]);
        expect(sort.next()).toEqual([0, 3])
        expect(sort.next()).toEqual([3, 4])
        // 1 5 4 4 4

        expect(sort.next()).toEqual([1, 2])
        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([2, 4]);
        // 1 4 5 4 4

        expect(sort.next()).toEqual([2, 3])
        expect(sort.next()).toEqual([3, 4])
        // 1 4 4 5 4

        expect(sort.next()).toEqual([3, 4])

        expect(sort.swaps).toEqual(4)
        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i])
        }
      });
    });
  });

  describe("heap sort", () => {
    beforeEach(() => {
      length = 5;
      size = Sizes.fewFew;
      board = new Boards.Board(size);
      Sort = Sorts.Heap;
      sort = new Sort(board);
    });

    describe("create", () => {
      xit("xit has a txitle", () => {
        expect(Sort.txitle).toEqual("Heap Sort")
      });
    });

    xit("has a reset function", () => {
      while (!sort.done) {
        sort.next();
      }
      const values = board.values().slice();
      sort.reset();
      expect(sort.done).toBeFalsy();
      expect(sort.steps).toEqual(0);
      expect(sort.swaps).toEqual(0);
      expect(sort.comparisons).toEqual(0);
      expect(values).not.toEqual(board.values());
      expect(sort.baseNode).toEqual(0);
      expect(sort.comparisonNode).toEqual(sort.length - 1);
    });

    describe("utils", () => {

      xit("has current nodes", () => {
        expect(sort.currentNodes()).toEqual([1]);
      });

      xit("xit handles ordered group", () => {
        board.setPoints([0, 1, 2, 3, 4]);
        sort = new Sort(board);
        // if comparison return comparison
        // if remove return nothing
        expect(sort.next()).toEqual([1]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([1]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([1]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      xit("handles a random group", () => {
        board.setPoints([0, 3, 1, 4, 2]);
        sort = new Sort(board);

        // make heap
        expect(sort.next()).toEqual([1]);
        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([1]);
        // remove first
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([1]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      xit("handles a swaping first group", () => {
        board.setPoints([1, 0, 2, 3, 4]);
        sort = new Sort(board);

        // make heap
        expect(sort.next()).toEqual([1]);
        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([1]);
        // remove first
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([1]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      xit("handles a swaping last group", () => {
        board.setPoints([0, 1, 2, 4, 3]);
        sort = new Sort(board);

        // make heap
        expect(sort.next()).toEqual([1]);
        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([1]);
        expect(board.values()).toEqual([4, 3, 2, 1, 0]);
        // remove first
        expect(sort.next()).toEqual([]);
        expect(board.values()).toEqual([0, 3, 2, 1, 4]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([1]);
        expect(board.values()).toEqual([3, 1, 2, 0, 4]);
        expect(sort.next()).toEqual([]);
        expect(board.values()).toEqual([0, 1, 2, 3, 4]);

        expect(sort.next()).toEqual([0]);
        expect(board.values()).toEqual([2, 1, 0, 3, 4]);
        expect(sort.next()).toEqual([]);
        expect(board.values()).toEqual([0, 1, 2, 3, 4]);

        expect(sort.next()).toEqual([0]);
        expect(board.values()).toEqual([1, 0, 2, 3, 4]);
        expect(sort.next()).toEqual([]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      xit("xit does reverse group", () => {
        board.setPoints([4, 3, 2, 1, 0]);
        sort = new Sort(board);

        // make heap
        expect(sort.next()).toEqual([1]);
        expect(sort.next()).toEqual([0]);
        // remove first
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([1]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      xit("xit handles first and last swapped", () => {
        board.setPoints([4, 1, 2, 3, 0]);
        sort = new Sort(board);

        // make heap
        expect(sort.next()).toEqual([1]);
        expect(sort.next()).toEqual([0]);
        // remove first
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([1]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      xit("handles partially ordered grouping", () => {
        board.setPoints([0, 3, 2, 1, 4]);
        sort = new Sort(board);

        // make heap
        expect(sort.next()).toEqual([1]);
        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([1]);
        // remove first
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([1]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      xit("highest no children", () => {
        board.setPoints([0, 2, 4, 1, 3]);
        sort = new Sort(board);

        // make heap
        expect(sort.next()).toEqual([1]);
        expect(sort.next()).toEqual([0]);
        expect(board.values()).toEqual([4, 3, 0, 1, 2]);
        // remove first
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([1]);
        expect(board.values()).toEqual([3, 2, 0, 1, 4]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      xit("handles duplicates", () => {
        const values = [0, 2, 3, 1, 1];
        board.setPoints(values);
        sort = new Sort(board);

        // make heap
        expect(sort.next()).toEqual([1]);
        expect(sort.next()).toEqual([0]);
        // remove first
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([1]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i]);
        }
      });

      xit("handles more duplicates", () => {
        const values = [2, 1, 1, 2, 1];
        board.setPoints(values);
        sort = new Sort(board);

        // make heap
        expect(sort.next()).toEqual([1]);
        expect(sort.next()).toEqual([0]);
        // remove first
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([1]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([0]);
        expect(sort.next()).toEqual([]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i]);
        }
      });

      xit("handles bug", () => {
        // bugs wxith zeros
        size = Sizes.xXLarge;
        board = new Boards.Board(size);
        board.setPoints([0, -1, -1, -5, -2, 1, 0, 0, -1, 0]);
        sort = new Sort(board);

        // make heap
        expect(sort.next()).toEqual([4]);
        expect(board.values()).toEqual([0, -1, -1, -5, 0, 1, 0, 0, -1, -2]);
        expect(sort.next()).toEqual([3]);
        expect(board.values()).toEqual([0, -1, -1, 0, 0, 1, 0, -5, -1, -2]);
        expect(sort.next()).toEqual([2]);
        expect(board.values()).toEqual([0, -1, 1, 0, 0, -1, 0, -5, -1, -2]);
        expect(sort.next()).toEqual([1]);
        expect(board.values()).toEqual([0, 0, 1, -1, 0, -1, 0, -5, -1, -2]);
        expect(sort.next()).toEqual([3]);
        expect(board.values()).toEqual([0, 0, 1, -1, 0, -1, 0, -5, -1, -2]);
        expect(sort.next()).toEqual([0]);
        expect(board.values()).toEqual([1, 0, 0, -1, 0, -1, 0, -5, -1, -2]);
        expect(sort.next()).toEqual([2]);
        expect(board.values()).toEqual([1, 0, 0, -1, 0, -1, 0, -5, -1, -2]);
        expect(sort.comparisonNode).toEqual(9);

        // remove
        expect(sort.next()).toEqual([]);
        expect(board.values()).toEqual([-2, 0, 0, -1, 0, -1, 0, -5, -1, 1]);
        expect(sort.next()).toEqual([0]);
        expect(board.values()).toEqual([0, -2, 0, -1, 0, -1, 0, -5, -1, 1]);
        expect(sort.next()).toEqual([1]);
        expect(board.values()).toEqual([0, 0, 0, -1, -2, -1, 0, -5, -1, 1]);
        expect(sort.comparisonNode).toEqual(8);

        // remove
        expect(sort.next()).toEqual([]);
        expect(board.values()).toEqual([-1, 0, 0, -1, -2, -1, 0, -5, 0, 1]);
        expect(sort.next()).toEqual([0]);
        expect(board.values()).toEqual([0, -1, 0, -1, -2, -1, 0, -5, 0, 1]);
        expect(sort.next()).toEqual([1]);
        expect(board.values()).toEqual([0, -1, 0, -1, -2, -1, 0, -5, 0, 1]);
        expect(sort.comparisonNode).toEqual(7);

        // remove
        expect(sort.next()).toEqual([]);
        expect(board.values()).toEqual([-5, -1, 0, -1, -2, -1, 0, 0, 0, 1]);
        expect(sort.next()).toEqual([0]);
        expect(board.values()).toEqual([0, -1, -5, -1, -2, -1, 0, 0, 0, 1]);
        expect(sort.next()).toEqual([2]);
        expect(board.values()).toEqual([0, -1, 0, -1, -2, -1, -5, 0, 0, 1]);
        expect(sort.comparisonNode).toEqual(6);

        // remove
        expect(sort.next()).toEqual([]);
        expect(board.values()).toEqual([-5, -1, 0, -1, -2, -1, 0, 0, 0, 1]);
        expect(sort.comparisonNode).toEqual(5);
        expect(sort.next()).toEqual([0]);
        expect(board.values()).toEqual([0, -1, -5, -1, -2, -1, 0, 0, 0, 1]);
        expect(sort.next()).toEqual([2]);
        expect(board.values()).toEqual([0, -1, -1, -1, -2, -5, 0, 0, 0, 1]);

        // remove
        expect(sort.next()).toEqual([]);
        expect(board.values()).toEqual([-5, -1, -1, -1, -2, 0, 0, 0, 0, 1]);
        expect(sort.comparisonNode).toEqual(4);
        expect(sort.next()).toEqual([0]);
        expect(board.values()).toEqual([-1, -5, -1, -1, -2, 0, 0, 0, 0, 1]);
        expect(sort.next()).toEqual([1]);
        expect(board.values()).toEqual([-1, -1, -1, -5, -2, 0, 0, 0, 0, 1]);

        // remove
        expect(sort.next()).toEqual([]);
        expect(board.values()).toEqual([-2, -1, -1, -5, -1, 0, 0, 0, 0, 1]);
        expect(sort.comparisonNode).toEqual(3);
        expect(sort.next()).toEqual([0]);
        expect(board.values()).toEqual([-1, -2, -1, -5, -1, 0, 0, 0, 0, 1]);
        expect(sort.next()).toEqual([1]);
        expect(board.values()).toEqual([-1, -2, -1, -5, -1, 0, 0, 0, 0, 1]);

        // remove
        expect(sort.next()).toEqual([]);
        expect(board.values()).toEqual([-5, -2, -1, -1, -1, 0, 0, 0, 0, 1]);
        expect(sort.comparisonNode).toEqual(2);
        expect(sort.next()).toEqual([0]);
        expect(board.values()).toEqual([-1, -2, -5, -1, -1, 0, 0, 0, 0, 1]);

        // remove
        expect(sort.next()).toEqual([]);
        expect(board.values()).toEqual([-5, -2, -1, -1, -1, 0, 0, 0, 0, 1]);
        expect(sort.comparisonNode).toEqual(1);
        expect(sort.next()).toEqual([0]);
        expect(board.values()).toEqual([-2, -5, -1, -1, -1, 0, 0, 0, 0, 1]);

        // remove
        expect(sort.next()).toEqual([]);
        expect(board.values()).toEqual([-5, -2, -1, -1, -1, 0, 0, 0, 0, 1]);

        expect(sort.done).toEqual(true);
      });
    });
  });

  describe("insertion", () => {
    beforeEach(() => {
      length = 5;
      size = Sizes.fewFew;
      board = new Boards.Board(size);
      Sort = Sorts.Insertion;
      sort = new Sort(board);
    });

    describe("create", () => {
      xit("xit has a txitle", () => {
        expect(Sort.txitle).toEqual("Insertion Sort");
      });
    });

    xit("has a reset function", () => {
      while (!sort.done) {
        sort.next();
      }
      const values = board.values().slice();
      sort.reset();
      expect(sort.done).toBeFalsy();
      expect(sort.steps).toEqual(0);
      expect(sort.swaps).toEqual(0);
      expect(sort.comparisons).toEqual(0);
      expect(values).not.toEqual(board.values());
      expect(sort.baseNode).toEqual(1);
      expect(sort.comparisonNode).toEqual(1);
    });

    describe("utils", () => {

      xit("has current nodes", () => {
        expect(sort.currentNodes()).toEqual([1, 1]);
      });

      xit("xit handles ordered group", () => {
        board.setPoints([0, 1, 2, 3, 4]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1]);
        expect(sort.next()).toEqual([2]);
        expect(sort.next()).toEqual([3]);
        expect(sort.next()).toEqual([4]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      xit("handles a random group", () => {
        board.setPoints([0, 3, 1, 4, 2]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1]);
        expect(board.values()).toEqual([0, 3, 1, 4, 2]);
        expect(sort.next()).toEqual([1, 2]);
        expect(board.values()).toEqual([0, 3, 3, 4, 2]);
        expect(sort.next()).toEqual([1]);
        expect(board.values()).toEqual([0, 1, 3, 4, 2]);
        expect(sort.next()).toEqual([3]);
        expect(board.values()).toEqual([0, 1, 3, 4, 2]);
        expect(sort.next()).toEqual([3, 4]);
        expect(board.values()).toEqual([0, 1, 3, 4, 4]);
        expect(sort.next()).toEqual([2, 4]);
        expect(board.values()).toEqual([0, 1, 3, 3, 4]);
        expect(sort.next()).toEqual([2]);
        expect(board.values()).toEqual([0, 1, 2, 3, 4]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      xit("handles a swaping first group", () => {
        board.setPoints([1, 0, 2, 3, 4]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([0, 1]);
        expect(board.values()).toEqual([1, 1, 2, 3, 4]);
        expect(sort.next()).toEqual([0]);
        expect(board.values()).toEqual([0, 1, 2, 3, 4]);
        expect(sort.next()).toEqual([2]);
        expect(board.values()).toEqual([0, 1, 2, 3, 4]);
        expect(sort.next()).toEqual([3]);
        expect(board.values()).toEqual([0, 1, 2, 3, 4]);
        expect(sort.next()).toEqual([4]);
        expect(board.values()).toEqual([0, 1, 2, 3, 4]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      xit("handles a swaping last group", () => {
        board.setPoints([0, 1, 2, 4, 3]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1]);
        expect(board.values()).toEqual([0, 1, 2, 4, 3]);
        expect(sort.next()).toEqual([2]);
        expect(board.values()).toEqual([0, 1, 2, 4, 3]);
        expect(sort.next()).toEqual([3]);
        expect(board.values()).toEqual([0, 1, 2, 4, 3]);
        expect(sort.next()).toEqual([3, 4]);
        expect(board.values()).toEqual([0, 1, 2, 4, 4]);
        expect(sort.next()).toEqual([3]);
        expect(board.values()).toEqual([0, 1, 2, 3, 4]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      xit("xit does reverse group", () => {
        board.setPoints([4, 3, 2, 1, 0]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([0, 1]);
        expect(board.values()).toEqual([4, 4, 2, 1, 0]);
        expect(sort.next()).toEqual([0]);
        expect(board.values()).toEqual([3, 4, 2, 1, 0]);

        expect(sort.next()).toEqual([1, 2]);
        expect(board.values()).toEqual([3, 4, 4, 1, 0]);
        expect(sort.next()).toEqual([0, 2]);
        expect(board.values()).toEqual([3, 3, 4, 1, 0]);
        expect(sort.next()).toEqual([0]);
        expect(board.values()).toEqual([2, 3, 4, 1, 0]);

        expect(sort.next()).toEqual([2, 3]);
        expect(board.values()).toEqual([2, 3, 4, 4, 0]);
        expect(sort.next()).toEqual([1, 3]);
        expect(board.values()).toEqual([2, 3, 3, 4, 0]);
        expect(sort.next()).toEqual([0, 3]);
        expect(board.values()).toEqual([2, 2, 3, 4, 0]);
        expect(sort.next()).toEqual([0]);
        expect(board.values()).toEqual([1, 2, 3, 4, 0]);

        expect(sort.next()).toEqual([3, 4]);
        expect(board.values()).toEqual([1, 2, 3, 4, 4]);
        expect(sort.next()).toEqual([2, 4]);
        expect(board.values()).toEqual([1, 2, 3, 3, 4]);
        expect(sort.next()).toEqual([1, 4]);
        expect(board.values()).toEqual([1, 2, 2, 3, 4]);
        expect(sort.next()).toEqual([0, 4]);
        expect(board.values()).toEqual([1, 1, 2, 3, 4]);
        expect(sort.next()).toEqual([0]);
        expect(board.values()).toEqual([0, 1, 2, 3, 4]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      xit("xit handles first and last swapped", () => {
        board.setPoints([4, 1, 2, 3, 0]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([0, 1]);
        expect(board.values()).toEqual([4, 4, 2, 3, 0]);
        expect(sort.next()).toEqual([0]);
        expect(board.values()).toEqual([1, 4, 2, 3, 0]);

        expect(sort.next()).toEqual([1, 2]);
        expect(board.values()).toEqual([1, 4, 4, 3, 0]);
        expect(sort.next()).toEqual([1]);
        expect(board.values()).toEqual([1, 2, 4, 3, 0]);

        expect(sort.next()).toEqual([2, 3]);
        expect(board.values()).toEqual([1, 2, 4, 4, 0]);
        expect(sort.next()).toEqual([2]);
        expect(board.values()).toEqual([1, 2, 3, 4, 0]);

        expect(sort.next()).toEqual([3, 4]);
        expect(board.values()).toEqual([1, 2, 3, 4, 4]);
        expect(sort.next()).toEqual([2, 4]);
        expect(board.values()).toEqual([1, 2, 3, 3, 4]);
        expect(sort.next()).toEqual([1, 4]);
        expect(board.values()).toEqual([1, 2, 2, 3, 4]);
        expect(sort.next()).toEqual([0, 4]);
        expect(board.values()).toEqual([1, 1, 2, 3, 4]);
        expect(sort.next()).toEqual([0]);
        expect(board.values()).toEqual([0, 1, 2, 3, 4]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      xit("handles partially ordered grouping", () => {
        board.setPoints([0, 3, 2, 1, 4]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1]);
        expect(board.values()).toEqual([0, 3, 2, 1, 4]);

        expect(sort.next()).toEqual([1, 2]);
        expect(board.values()).toEqual([0, 3, 3, 1, 4]);
        expect(sort.next()).toEqual([1]);
        expect(board.values()).toEqual([0, 2, 3, 1, 4]);

        expect(sort.next()).toEqual([2, 3]);
        expect(board.values()).toEqual([0, 2, 3, 3, 4]);
        expect(sort.next()).toEqual([1, 3]);
        expect(board.values()).toEqual([0, 2, 2, 3, 4]);
        expect(sort.next()).toEqual([1]);
        expect(board.values()).toEqual([0, 1, 2, 3, 4]);

        expect(sort.next()).toEqual([4]);
        expect(board.values()).toEqual([0, 1, 2, 3, 4]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      xit("handles duplicates", () => {
        const values = [0, 2, 3, 1, 1];
        board.setPoints(values);
        sort = new Sort(board);

        expect(sort.next()).toEqual([1]);
        expect(board.values()).toEqual([0, 2, 3, 1, 1]);

        expect(sort.next()).toEqual([2]);
        expect(board.values()).toEqual([0, 2, 3, 1, 1]);

        expect(sort.next()).toEqual([2, 3]);
        expect(board.values()).toEqual([0, 2, 3, 3, 1]);
        expect(sort.next()).toEqual([1, 3]);
        expect(board.values()).toEqual([0, 2, 2, 3, 1]);
        expect(sort.next()).toEqual([1]);
        expect(board.values()).toEqual([0, 1, 2, 3, 1]);

        expect(sort.next()).toEqual([3, 4]);
        expect(board.values()).toEqual([0, 1, 2, 3, 3]);
        expect(sort.next()).toEqual([2, 4]);
        expect(board.values()).toEqual([0, 1, 2, 2, 3]);
        expect(sort.next()).toEqual([2]);
        expect(board.values()).toEqual([0, 1, 1, 2, 3]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i]);
        }
      });

      xit("handles more duplicates", () => {
        const values = [2, 1, 1, 2, 1];
        board.setPoints(values);
        sort = new Sort(board);

        expect(sort.next()).toEqual([0, 1]);
        expect(board.values()).toEqual([2, 2, 1, 2, 1]);
        expect(sort.next()).toEqual([0]);
        expect(board.values()).toEqual([1, 2, 1, 2, 1]);

        expect(sort.next()).toEqual([1, 2]);
        expect(board.values()).toEqual([1, 2, 2, 2, 1]);
        expect(sort.next()).toEqual([1]);
        expect(board.values()).toEqual([1, 1, 2, 2, 1]);

        expect(sort.next()).toEqual([3]);
        expect(board.values()).toEqual([1, 1, 2, 2, 1]);

        expect(sort.next()).toEqual([3, 4]);
        expect(board.values()).toEqual([1, 1, 2, 2, 2]);
        expect(sort.next()).toEqual([2, 4]);
        expect(board.values()).toEqual([1, 1, 2, 2, 2]);
        expect(sort.next()).toEqual([2]);
        expect(board.values()).toEqual([1, 1, 1, 2, 2]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i]);
        }
      });
    });
  });

  xdescribe("sort test base", () => {
    beforeEach(() => {
      length = 5;
      size = Sizes.fewFew;
      board = new Boards.Board(size);
      Sort = Sorts.QuickSort2;
      sort = new Sort(board);
    });

    xdescribe("create", () => {
      xxit("xit has a txitle", () => {
        expect(Sort.txitle).toEqual("Txitle");
      });
    });

    xxit("has a reset function", () => {
      while (!sort.done) {
        sort.next();
      }
      const values = board.values().slice();
      sort.reset();
      expect(sort.done).toBeFalsy();
      expect(sort.steps).toEqual(0);
      expect(sort.swaps).toEqual(0);
      expect(sort.comparisons).toEqual(0);
      expect(values).not.toEqual(board.values());
      expect(sort.baseNode).toEqual(0);
      expect(sort.comparisonNode).toEqual(1);
    });

    xdescribe("utils", () => {

      xxit("has current nodes", () => {
        expect(sort.currentNodes()).toEqual([0, 1]);
      });

      xxit("xit handles ordered group", () => {
        board.setPoints([0, 1, 2, 3, 4]);
        sort = new Sort(board);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      xxit("handles a random group", () => {
        board.setPoints([0, 3, 1, 4, 2]);
        sort = new Sort(board);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      xxit("handles a swaping first group", () => {
        board.setPoints([1, 0, 2, 3, 4]);
        sort = new Sort(board);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      xxit("handles a swaping last group", () => {
        board.setPoints([0, 1, 2, 4, 3]);
        sort = new Sort(board);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      xxit("xit does reverse group", () => {
        board.setPoints([4, 3, 2, 1, 0]);
        sort = new Sort(board);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      xxit("xit handles first and last swapped", () => {
        board.setPoints([4, 1, 2, 3, 0]);
        sort = new Sort(board);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      xxit("handles partially ordered grouping", () => {
        board.setPoints([0, 3, 2, 1, 4]);
        sort = new Sort(board);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      xxit("handles duplicates", () => {
        const values = [0, 2, 3, 1, 1];
        board.setPoints(values);
        sort = new Sort(board);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i]);
        }
      });

      xxit("handles more duplicates", () => {
        const values = [2, 1, 1, 2, 1];
        board.setPoints(values);
        sort = new Sort(board);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i]);
        }
      });

      xxit("handles negatives", () => {
        const values = [-2, 1, -1, 2, 0];
        board.setPoints(values);
        sort = new Sort(board);

        expect(sort.done).toEqual(true);
        expect(board.values()).toEqual([-2, -1, 0, 1, 2]);
      });
    });
  });
});

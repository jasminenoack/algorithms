describe("Odd Even", function () {
  let length, sort, board, size;
  describe("odd even single processor", () => {
    beforeEach(function () {
      length = 5
      size = Sizes.fewFew
      board = new Boards.Board(size)
      Sort = Sorts.OddEven
      sort = new Sort(board)
    });

    describe("create", function () {
      xit("xit has a txitle", () => {
        expect(Sort.txitle).toEqual('Odd Even(Single Processor)')
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
      expect(sort.baseNodes.length).toBeTruthy()
      expect(sort.baseNode).toEqual(1)
      expect(sort.comparisonNode).toEqual(2)
      expect(sort.evenSorted).toBeFalsy()
      expect(sort.oddSorted).toBeFalsy()
      expect(sort.oddPhase).toBeTruthy()
    })

    describe("utils", () => {

      xit("has current nodes(returns base nodes)", () => {
        expect(sort.currentNodes()).toEqual([1, 3])
      })

      xit("xit handles ordered group", () => {
        board.setPoints([0, 1, 2, 3, 4])
        sort = new Sort(board)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])

        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([2])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles a random group", () => {
        board.setPoints([0, 3, 1, 4, 2])
        sort = new Sort(board)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([2])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([2])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles a swaping first group", () => {
        board.setPoints([1, 0, 2, 3, 4])
        sort = new Sort(board)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([2])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([2])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles a swaping second group", () => {
        board.setPoints([0, 2, 1, 3, 4])
        sort = new Sort(board)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([2])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles a swaping last group", () => {
        board.setPoints([0, 1, 2, 4, 3])
        sort = new Sort(board)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([2])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("xit does reverse group", () => {
        board.setPoints([4, 3, 2, 1, 0])
        sort = new Sort(board)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([2])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([2])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([2])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("xit handles first and last swapped", () => {
        board.setPoints([4, 1, 2, 3, 0])
        sort = new Sort(board)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])
        expect(sort.done).toEqual(false)
        // 4 1 2 0 3

        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([2])
        expect(sort.done).toEqual(false)
        // 1 4 0 2 3

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])
        expect(sort.done).toEqual(false)
        // 1 0 4 2 3

        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([2])
        expect(sort.done).toEqual(false)
        // 0 1 2 4 3

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])
        expect(sort.done).toEqual(false)
        // 0 1 2 3 4

        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([2])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles partially ordered grouping", () => {
        board.setPoints([0, 3, 2, 1, 4])
        sort = new Sort(board)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])
        expect(sort.done).toEqual(false)
        // 0 2 3 1 4

        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([2])
        expect(sort.done).toEqual(false)
        // 0 2 1 3 4

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])
        expect(sort.done).toEqual(false)
        // 0 1 2 3 4

        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([2])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles duplicates", () => {
        let values = [0, 2, 3, 1, 1]
        board.setPoints(values)
        sort = new Sort(board)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])
        expect(sort.done).toEqual(false)
        // 0 2 3 1 1

        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([2])
        expect(sort.done).toEqual(false)
        // 0 2 1 3 1

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])
        expect(sort.done).toEqual(false)
        // 0 1 2 1 3

        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([2])
        expect(sort.done).toEqual(false)
        // 0 1 1 2 3

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([2])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i])
        }
      })

      xit("handles more duplicates", () => {
        let values = [2, 1, 1, 2, 1]
        board.setPoints(values)
        sort = new Sort(board)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])
        expect(sort.done).toEqual(false)
        // 2 1 1 1 2

        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([2])
        expect(sort.done).toEqual(false)
        // 1 2 1 1 2

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])
        expect(sort.done).toEqual(false)
        // 1 1 2 1 2

        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([2])
        expect(sort.done).toEqual(false)
        // 1 1 1 2 2

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([3])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([0, 2])
        expect(sort.next()).toEqual([2])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i])
        }
      })
    })
  })

  describe("odd even concurrent", () => {
    beforeEach(function () {
      length = 5
      size = Sizes.fewFew
      board = new Boards.Board(size)
      Sort = Sorts.OddEvenConcurrent
      sort = new Sort(board)
    });

    describe("create", function () {
      xit("xit has a txitle", () => {
        expect(Sort.txitle).toEqual('Odd Even(Concurrent)')
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
      expect(sort.baseNode).toEqual(1)
      expect(sort.comparisonNode).toEqual(2)
      expect(sort.evenSorted).toBeFalsy()
      expect(sort.oddSorted).toBeFalsy()
      expect(sort.oddPhase).toBeTruthy()
    })

    describe("utils", () => {

      xit("has current nodes(returns base nodes)", () => {
        expect(sort.currentNodes()).toEqual([1, 3])
      })

      xit("xit handles ordered group", () => {
        board.setPoints([0, 1, 2, 3, 4])
        sort = new Sort(board)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.next()).toEqual([0, 2])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles a random group", () => {
        board.setPoints([0, 3, 1, 4, 2])
        sort = new Sort(board)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([0, 2])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([0, 2])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles a swaping first group", () => {
        board.setPoints([1, 0, 2, 3, 4])
        sort = new Sort(board)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([0, 2])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([0, 2])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles a swaping second group", () => {
        board.setPoints([0, 2, 1, 3, 4])
        sort = new Sort(board)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([0, 2])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([1, 3])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles a swaping last group", () => {
        board.setPoints([0, 1, 2, 4, 3])
        sort = new Sort(board)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([0, 2])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([1, 3])

        expect(sort.done).toEqual(true)
        expect(sort.next()).toEqual([])
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("xit does reverse group", () => {
        board.setPoints([4, 3, 2, 1, 0])
        sort = new Sort(board)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([0, 2])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([0, 2])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([0, 2])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([1, 3])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("xit handles first and last swapped", () => {
        board.setPoints([4, 1, 2, 3, 0])
        sort = new Sort(board)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.done).toEqual(false)
        // 4 1 2 0 3

        expect(sort.next()).toEqual([0, 2])
        expect(sort.done).toEqual(false)
        // 1 4 0 2 3

        expect(sort.next()).toEqual([1, 3])
        expect(sort.done).toEqual(false)
        // 1 0 4 2 3

        expect(sort.next()).toEqual([0, 2])
        expect(sort.done).toEqual(false)
        // 0 1 2 4 3

        expect(sort.next()).toEqual([1, 3])
        expect(sort.done).toEqual(false)
        // 0 1 2 3 4

        expect(sort.next()).toEqual([0, 2])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([1, 3])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles partially ordered grouping", () => {
        board.setPoints([0, 3, 2, 1, 4])
        sort = new Sort(board)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.done).toEqual(false)
        // 0 2 3 1 4

        expect(sort.next()).toEqual([0, 2])
        expect(sort.done).toEqual(false)
        // 0 2 1 3 4

        expect(sort.next()).toEqual([1, 3])
        expect(sort.done).toEqual(false)
        // 0 1 2 3 4

        expect(sort.next()).toEqual([0, 2])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([1, 3])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i])
        }
      })

      xit("handles duplicates", () => {
        let values = [0, 2, 3, 1, 1]
        board.setPoints(values)
        sort = new Sort(board)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.done).toEqual(false)
        // 0 2 3 1 1

        expect(sort.next()).toEqual([0, 2])
        expect(sort.done).toEqual(false)
        // 0 2 1 3 1

        expect(sort.next()).toEqual([1, 3])
        expect(sort.done).toEqual(false)
        // 0 1 2 1 3

        expect(sort.next()).toEqual([0, 2])
        expect(sort.done).toEqual(false)
        // 0 1 1 2 3

        expect(sort.next()).toEqual([1, 3])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([0, 2])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i])
        }
      })

      xit("handles more duplicates", () => {
        let values = [2, 1, 1, 2, 1]
        board.setPoints(values)
        sort = new Sort(board)

        expect(sort.next()).toEqual([1, 3])
        expect(sort.done).toEqual(false)
        // 2 1 1 1 2

        expect(sort.next()).toEqual([0, 2])
        expect(sort.done).toEqual(false)
        // 1 2 1 1 2

        expect(sort.next()).toEqual([1, 3])
        expect(sort.done).toEqual(false)
        // 1 1 2 1 2

        expect(sort.next()).toEqual([0, 2])
        expect(sort.done).toEqual(false)
        // 1 1 1 2 2

        expect(sort.next()).toEqual([1, 3])
        expect(sort.done).toEqual(false)

        expect(sort.next()).toEqual([0, 2])

        expect(sort.done).toEqual(true)
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i])
        }
      })
    })
  })
});

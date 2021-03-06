import { Board } from "../../src/board";
import { BaseSort } from "../../src/sorts/baseSort";
import { fewFew, ISize } from "./../../src/sizes";
import { QuickSort2 } from "./../../src/sorts/quick/base";
import { QuickSort3 } from "./../../src/sorts/quick/partition3";
import { QuickSort2RightPartition } from "./../../src/sorts/quick/rightPartition";

describe("Quick Sort", () => {
  let length: number;
  let sort: BaseSort;
  let board: Board;
  let size: ISize;
  let Sort: any;

  describe("quick 2 left partition", () => {
    beforeEach(() => {
      length = 5;
      size = fewFew;
      board = new Board(size);
      Sort = QuickSort2;
      sort = new Sort(board);
    });

    describe("create", () => {
      it("it has a title", () => {
        expect(Sort.title).toEqual("Quick Sort(Left Partition)");
      });

      it("has a partition", () => {
        expect(sort.partition).not.toEqual(undefined);
      });
    });

    it("has a reset function", () => {
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
      expect(sort.lower).toEqual(sort.baseNode);
      expect(sort.higher).toEqual(sort.baseNode);
      expect(sort.partitionStart).toEqual(sort.baseNode);
      expect(sort.partitionEnd).toEqual(sort.length - 1);
      expect(sort.partition).toEqual(sort.lower);
      expect(sort.partitionTop).toEqual(sort.partition);
    });

    describe("utils", () => {

      it("has current nodes", () => {
        expect(sort.currentNodes()).toEqual([0]);

        sort.lower = 1;
        sort.partition = 2;
        sort.higher = 3;
        expect(sort.currentNodes()).toEqual([1, 2, 3]);

        sort.lower = 2;
        expect(sort.currentNodes()).toEqual([2, 3]);

        sort.lower = 1;
        sort.higher = 2;
        expect(sort.currentNodes()).toEqual([1, 2]);
      });

      it("it handles ordered group", () => {
        board.setPoints([0, 1, 2, 3, 4]);
        sort = new Sort(board);

        sort.partition = 0;

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles a random group", () => {
        board.setPoints([0, 3, 1, 4, 2]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([2, 3, 4]);

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles a swaping first group", () => {
        board.setPoints([1, 0, 2, 3, 4]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles a swaping last group", () => {
        board.setPoints([0, 1, 2, 4, 3]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([3, 4]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("it does reverse group", () => {
        board.setPoints([4, 3, 2, 1, 0]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([2, 3]);
        expect(sort.next()).toEqual([3, 4]);
        // 3 2 1 0

        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([2, 3]);
        // 2 1 0

        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([1, 2]);

        expect(sort.next()).toEqual([0, 1]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("it handles first and last swapped", () => {
        board.setPoints([4, 1, 2, 3, 0]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([2, 3]);
        expect(sort.next()).toEqual([3, 4]);
        // 1, 2, 3, 0

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([0, 1, 2, 3]);
        // _ _ 2 3

        expect(sort.next()).toEqual([]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles partially ordered grouping", () => {
        board.setPoints([0, 3, 2, 1, 4]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        // _ 3 2 1 4

        expect(sort.next()).toEqual([1, 2]);
        // _ 2 *3 1 4
        expect(sort.next()).toEqual([2, 3]);
        // _ 2 1 *3 4
        expect(sort.next()).toEqual([]);
        // _ 2 1 _ _

        expect(sort.next()).toEqual([1, 2]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles duplicates", () => {
        const values = [0, 2, 3, 1, 1];
        board.setPoints(values);
        sort = new Sort(board);

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        // _ 2 3 1 1

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([1, 2, 3]);
        expect(sort.next()).toEqual([2, 3, 4]);
        // _ 1 1 _ _

        expect(sort.next()).toEqual([]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i]);
        }
      });

      it("handles more duplicates", () => {
        const values = [2, 1, 1, 2, 1];
        board.setPoints(values);
        sort = new Sort(board);

        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([2, 3, 4]);
        // 1 1 1 _ _

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i]);
        }
      });
    });
  });

  describe("quick 2 right partition", () => {
    beforeEach(() => {
      length = 5;
      size = fewFew;
      board = new Board(size);
      Sort = QuickSort2RightPartition;
      sort = new Sort(board);
    });

    describe("create", () => {
      it("it has a title", () => {
        expect(Sort.title).toEqual("Quick Sort(Right Partition)");
      });

      it("has a partition", () => {
        expect(sort.partition).not.toEqual(undefined);
      });
    });

    it("has a reset function", () => {
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
      expect(sort.lower).toEqual(sort.baseNode);
      expect(sort.higher).toEqual(sort.baseNode);
      expect(sort.partitionStart).toEqual(sort.baseNode);
      expect(sort.partitionEnd).toEqual(sort.length - 1);
      expect(sort.partition).toEqual(sort.lower);
      expect(sort.partitionTop).toEqual(sort.partition);
    });

    describe("utils", () => {

      it("has current nodes", () => {
        expect(sort.currentNodes()).toEqual([0]);

        sort.lower = 1;
        sort.partition = 2;
        sort.higher = 3;
        expect(sort.currentNodes()).toEqual([1, 2, 3]);

        sort.lower = 2;
        expect(sort.currentNodes()).toEqual([2, 3]);

        sort.lower = 1;
        sort.higher = 2;
        expect(sort.currentNodes()).toEqual([1, 2]);
      });

      it("it handles ordered group", () => {
        board.setPoints([0, 1, 2, 3, 4]);
        sort = new Sort(board);

        sort.partition = 0;

        expect(sort.next()).toEqual([0, 1, 4]);
        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([2, 3]);
        expect(sort.next()).toEqual([3, 4]);
        // 0 2 3 1

        expect(sort.next()).toEqual([0, 3]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        // _ 1 3 2

        expect(sort.next()).toEqual([1, 3]);
        expect(sort.next()).toEqual([]);
        // _ _ 2 3

        expect(sort.next()).toEqual([2, 3]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles a random group", () => {
        board.setPoints([0, 3, 1, 4, 2]);
        sort = new Sort(board);

        // 0 3 1 4 2
        // 2 3 1 4 0
        expect(sort.next()).toEqual([0, 4]);
        expect(sort.next()).toEqual([0, 1, 2]);
        // 1 2 3 4 0
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([1, 2, 3, 4]);

        // 1 0 _ 3 4

        expect(sort.next()).toEqual([0, 1]);

        expect(sort.next()).toEqual([3, 4]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });
    });
  });

  describe("quick 3 left partition", () => {
    beforeEach(() => {
      length = 5;
      size = fewFew;
      board = new Board(size);
      Sort = QuickSort3;
      sort = new Sort(board);
    });

    describe("create", () => {
      it("it has a title", () => {
        expect(Sort.title).toEqual("Quick Sort 3(Left Partition)");
      });

      it("has a partition", () => {
        expect(sort.partition).not.toEqual(undefined);
      });
    });

    it("has a reset function", () => {
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
      expect(sort.lower).toEqual(sort.baseNode);
      expect(sort.higher).toEqual(sort.baseNode);
      expect(sort.partitionStart).toEqual(sort.baseNode);
      expect(sort.partitionEnd).toEqual(sort.length - 1);
      expect(sort.partition).toEqual(sort.lower);
      expect(sort.partitionTop).toEqual(sort.partition);
    });

    describe("utils", () => {

      it("has current nodes", () => {
        expect(sort.currentNodes()).toEqual([0]);

        sort.lower = 1;
        sort.partition = 2;
        sort.higher = 3;
        expect(sort.currentNodes()).toEqual([1, 2, 3]);

        sort.lower = 2;
        expect(sort.currentNodes()).toEqual([2, 3]);

        sort.lower = 1;
        sort.higher = 2;
        expect(sort.currentNodes()).toEqual([1, 2]);
      });

      it("it handles ordered group", () => {
        board.setPoints([0, 1, 2, 3, 4]);
        sort = new Sort(board);

        sort.partition = 0;

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles a random group", () => {
        board.setPoints([0, 3, 1, 4, 2]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        // _ 3 1 4 2

        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([2, 3, 4]);
        // _ 1 2 _ _

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles a swaping first group", () => {
        board.setPoints([1, 0, 2, 3, 4]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles a swaping last group", () => {
        board.setPoints([0, 1, 2, 4, 3]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);

        expect(sort.next()).toEqual([3, 4]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("it does reverse group", () => {
        board.setPoints([4, 3, 2, 1, 0]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([2, 3]);
        expect(sort.next()).toEqual([3, 4]);
        // 3 2 1 0

        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([2, 3]);
        // 2 1 0

        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([1, 2]);

        expect(sort.next()).toEqual([0, 1]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("it handles first and last swapped", () => {
        board.setPoints([4, 1, 2, 3, 0]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([0, 1]);
        expect(sort.next()).toEqual([1, 2]);
        expect(sort.next()).toEqual([2, 3]);
        expect(sort.next()).toEqual([3, 4]);
        // 1, 2, 3, 0

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([0, 1, 2, 3]);
        // _ _ 2 3

        expect(sort.next()).toEqual([]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles partially ordered grouping", () => {
        board.setPoints([0, 3, 2, 1, 4]);
        sort = new Sort(board);

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        // _ 3 2 1 4

        expect(sort.next()).toEqual([1, 2]);
        // _ 2 *3 1 4
        expect(sort.next()).toEqual([2, 3]);
        // _ 2 1 *3 4
        expect(sort.next()).toEqual([]);
        // _ 2 1 _ _

        expect(sort.next()).toEqual([1, 2]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(i).toEqual(board.values()[i]);
        }
      });

      it("handles duplicates", () => {
        const values = [1, 2, 3, 0, 1];
        board.setPoints(values);
        sort = new Sort(board);

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([0, 1, 2, 3]);
        expect(sort.next()).toEqual([0, 1, 2, 3, 4]);
        // _ _ _ 2 3

        expect(sort.next()).toEqual([]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i]);
        }
      });

      it("handles more duplicates", () => {
        const values = [1, 2, 1, 2, 1];
        board.setPoints(values);
        sort = new Sort(board);

        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([0, 1, 2]);
        expect(sort.next()).toEqual([]);
        expect(sort.next()).toEqual([0, 1, 2, 3, 4]);

        expect(sort.next()).toEqual([2, 3, 4]);

        expect(sort.done).toEqual(true);
        for (let i = 0; i < board.length; i++) {
          expect(values.slice().sort()[i]).toEqual(board.values()[i]);
        }
      });
    });
  });
});

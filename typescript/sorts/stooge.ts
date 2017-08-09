import {BaseSort} from './baseSort'

export class Stooge extends BaseSort {
    static title = "Stooge Sort"
    partitions: number[][]

    subsets(indexes: number[]) {
        let [first, last] = indexes
        // find the number of elements
        let diff = last - first + 1
        // find the number to adjust by
        let sectionSize = Math.ceil(diff * 2 / 3) - 1
        return [
            [first, first + sectionSize],
            [last - sectionSize, last],
            [first, first + sectionSize]
        ]
    }

    breakDownSubset(indexes: number[]) {
        let final: number[][] = [indexes]
        while(this.hasLargeEnoughDiff(final[0])) {
            final = this.subsets(final.shift()).concat(final)
        }
        return final
    }

    hasLargeEnoughDiff(nums: number[]): boolean {
        return nums[1] - nums[0] >= 2
    }

    setUp() {
        this.partitions = this.breakDownSubset([0, this.length - 1])
        let nextValuess: number[] = this.partitions.shift();
        [this.baseNode, this.comparisonNode] = nextValuess
    }

    setUpNext() {
        if (this.partitions.length) {
            let nextValues = this.partitions.shift();
            if (this.hasLargeEnoughDiff(nextValues)) {
                this.partitions = this.breakDownSubset(nextValues).concat(this.partitions)
                nextValues = this.partitions.shift();
            }
            [this.baseNode, this.comparisonNode] = nextValues
        } else {
            this.setDone()
        }
    }
}

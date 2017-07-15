namespace Boards {
    // export enum Shuffle {Random, Ordered, Reversed, MostlySorted, MostlyReversed}

    export enum ValueType {Integers, FewUnique, Random}

    export class Board {
        points: Points.Point[] = [];
        size: Sizes.Size;
        length: number;
        constructor(
            size, public shuffle: Shuffles.Shuffle = new Shuffles.RandomShuffle(),
            public valueType: ValueType = ValueType.Integers
        ) {
            this.setSize(size)
            this.createValues()
            this.shuffleBoard()
        }
        createValues() {
            let values = []
            if (this.valueType === ValueType.FewUnique) {
                let numberPerSection = this.length / 5
                for (let i = 0; i < this.length; i ++) {
                    values.push(
                        Math.floor(i / numberPerSection) * numberPerSection
                    )
                }
            } else if (this.valueType === ValueType.Random) {
                for (let i = 0; i < this.length; i++) {
                    values.push(Math.floor(Math.random() * this.length))
                }
            } else {
                values = Array.prototype.range(this.length)
            }
            this.setPoints(values)

        }
        shuffleBoard() {
            let values = this.values()
            this.shuffle.shuffle(values)
            this.setPoints(values)
        }
        shuffleToMostlySorted(values) {
            let numberOfSwitches = Math.ceil(Math.random() * this.length / 5) + 1

            for (let i = 0; i < numberOfSwitches; i++) {
                let indexToInsert = Math.floor(Math.random() * this.length)

                let rangeStart = Math.max(0, indexToInsert - 3)
                let rangeEnd = Math.min(this.length - 1, indexToInsert + 3)
                // can be any inclusive
                let variability = rangeEnd - rangeStart + 1
                let insertLocation = Math.floor(Math.random() * variability) + rangeStart

                let valueToInsert = values[indexToInsert]
                values.splice(indexToInsert, 1)
                values.splice(insertLocation, 0, valueToInsert)
            }
        }
        setPoints(values) {
            let that = this
            values.forEach(function(value, index) {
                that.points[index].value = value
            })
        }
        swap(index1, index2) {
            let temp = this.get(index1)
            this.points[index1] = this.get(index2)
            this.points[index2] = temp
        }
        values() {
            let items = []
            for (let i = 0; i < this.length; i++) {
                items.push(this.points[i].value)
            }
            return items
        }
        setSize(size) {
            this.size = size
            this.length = this.size.elemCount
            this.points = []
            for (let i = 0; i < this.length; i++) {
                this.points.push(new Points.Point(i))
            }
        }
        get(index) {
            return this.points[index]
        }
        min() {
            return Math.min(...this.values())
        }
        max() {
            return Math.max(...this.values())
        }
        differenceFromOrdered() {
            return 0
            // let values = this.values()
            // let ordered = Array.prototype.range(values.length)
            // let difference = 0
            // for(let i = 0; i < values.length; i++) {
            //     difference += Math.abs(values[i] - i)
            // }
            // return difference
        }
        distribution() {
            let dist = {}
            let values = this.values()
            values.forEach((value) => {
                dist[value] = (dist[value] || 0) + 1
            })
            return dist
        }
    }
}

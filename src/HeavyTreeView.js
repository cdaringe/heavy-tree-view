var HeavyTreeNode = require('./HeavyTreeNode')
var repeat = require('lodash/repeat')
var times = require('lodash/times')
var sum = require('lodash/sum')
var take = require('lodash/take')

var TOP_EDGE_CHAR = '──┐'
var STD_EDGE_CHAR = '--┤'

class HeavyTreeView {
  constructor ({ height, count }) {
    this.columns = Object.seal(times(height, () => 0))
    this.rows = Object.seal(times(count, () => 0))
    this.heavyNodes = new Map()
    this.nodesToHeavyNode = new Map()
  }
  registerNode (heavyNode) {
    if (this.heavyNodes.has(heavyNode.address())) {
      throw new Error(`node already exists at ${heavyNode.address()}`)
    }
    this.heavyNodes.set(heavyNode.address(), heavyNode)
    if (this.rows[heavyNode.y]) {
      throw new Error(`node already in row ${heavyNode.y}`)
    }
    this.rows[heavyNode.y] = heavyNode
    this.nodesToHeavyNode.set(heavyNode.node, heavyNode)
  }

  get root () {
    var rootAddress = `${this.columns.length - 1}-${this.rows.length - 1}`
    var root = this.heavyNodes.get(rootAddress)
    if (!root) throw new Error(`root not found @${rootAddress}`)
    return root
  }

  widthsByColumn (i) {
    if (!this._widthsByColumn) this._widthsByColumn = new Map()
    if (this._widthsByColumn.has(i)) return this._widthsByColumn.get(i)
    var max = Array.from(this.heavyNodes.values())
      .filter(hn => hn.x === i)
      .reduce((max, hn) => (hn.width() > max ? hn.width() : max), 0)
    this._widthsByColumn.set(i, max + TOP_EDGE_CHAR.length)
    return this.widthsByColumn(i)
  }
  findSpineChars (heavyNode) {
    var node = heavyNode.node
    var dependentHeavyNodes = node.children.map(node =>
      this.nodesToHeavyNode.get(node)
    )
    if (dependentHeavyNodes.length === 0) return null
    if (dependentHeavyNodes.length === 1) {
      return [[[heavyNode.x, heavyNode.y - 1], TOP_EDGE_CHAR]]
    }
    var numDecendants = dependentHeavyNodes.map(
      heavyNode => HeavyTreeNode.count(heavyNode.node) - 1
    )
    return numDecendants
      .reduce((agg, dependentCount, i) => {
        var isLastDependent = i === numDecendants.length - 1
        var chars = [STD_EDGE_CHAR]
        if (dependentCount && !isLastDependent) {
          chars = chars.concat(times(dependentCount, () => '|'))
        }
        if (isLastDependent) chars[chars.length - 1] = TOP_EDGE_CHAR
        return agg.concat(chars)
      }, [])
      .map((char, j) => {
        return [[heavyNode.x, heavyNode.y - 1 - j], char]
      })
  }
  lineString (heavyNode, spineColCharsForLine) {
    var str = ''
    var i = 0 // col index
    var j = 0 // char index
    var hasTerminatedOnce = false

    // pad left for non filled cols
    while (i < heavyNode.x) {
      let spineCompensation = i === heavyNode.x - 1 ? i + 1 : 0
      str += repeat(' ', this.widthsByColumn(i) - spineCompensation)
      ++i
    }
    str += heavyNode.node.name

    while (spineColCharsForLine.length) {
      var colTerm = ''
      // var nxt = HeavyTreeView.hasMoreSpinalCharsForRow(spineColCharsForLine, i)
      // if (nxt) {
      //   var [ [x, y], colTerm ] = spineColCharsForLine.shift()
      // }
      if (
        spineColCharsForLine.length &&
        i === spineColCharsForLine[0][0][0] - 1
      ) {
        var [[x, y], colTerm] = spineColCharsForLine.shift()
      }
      // col with name
      if (i === heavyNode.x) {
        var rightPadRemaining =
          this.widthsByColumn(i) - heavyNode.node.name.length
        if (colTerm) {
          // with terminator
          str += repeat('-', rightPadRemaining - colTerm.length) + colTerm
          hasTerminatedOnce = true
        } else {
          // without terminator
          str += repeat('-', rightPadRemaining - 1)
        }
      } else if (i === x - 1) {
        // col with terminator
        str +=
          repeat(
            hasTerminatedOnce ? ' ' : '-',
            this.widthsByColumn(i) -
              colTerm.length -
              (hasTerminatedOnce ? 1 : 0)
          ) + colTerm
      } else {
        // col as pure buffer
        str += repeat(hasTerminatedOnce ? ' ' : '-', this.widthsByColumn(i) - 1)
      }
      ++i
    }
    if (spineColCharsForLine.length) debugger // should never happen
    return str
  }
  toString () {
    var spineColChars = []
    return this.rows
      .reverse()
      .map(heavyNode => {
        var currentNodeSpineChars = this.findSpineChars(heavyNode)
        if (currentNodeSpineChars) {
          spineColChars = currentNodeSpineChars.concat(spineColChars)
        }
        let spineColCharsForLine = this.stripSpineColCharsForRow(
          spineColChars,
          heavyNode.y
        )
        return this.lineString(heavyNode, spineColCharsForLine)
      })
      .reverse()
      .join('\n')
  }
  stripSpineColCharsForRow (colChars, row) {
    var colCharsForRow = []
    for (var colChar of colChars) {
      var [[x, y], char] = colChar
      if (row === y) colCharsForRow.push(colChar)
    }
    return colCharsForRow
  }
}

HeavyTreeView.hasMoreSpinalCharsForRow = function hasMoreSpinalCharsForRow (
  spineColCharsForLine,
  i
) {
  return (
    spineColCharsForLine.length > 0 &&
    spineColCharsForLine.some(
      spineColCharForLine => spineColCharForLine[0] - 1 === i
    )
  )
}
HeavyTreeView.toHeavyTreeNode = function toHeavyTreeNode (
  ht,
  node,
  col,
  row,
  isRoot
) {
  var dependents = Object.values(node.children)
  var htn
  // leaf nodes
  if (!dependents.length) {
    htn = new HeavyTreeNode({ node, x: 0, y: row })
    ht.registerNode(htn)
    return col
  }
  // non-leaf nodes
  var numDescendants = dependents.map(dep => HeavyTreeNode.count(dep))
  var columnShift = dependents.map((dep, i) => {
    var depRow = row - 1 - sum(take(numDescendants, i))
    return HeavyTreeView.toHeavyTreeNode(ht, dep, col - 1, depRow, false)
  })[0]
  var columnIndex = isRoot ? col : col - columnShift
  htn = new HeavyTreeNode({ node, x: columnIndex, y: row })
  ht.registerNode(htn)
  return columnShift
}

HeavyTreeView.parseTree = function parseTree (root) {
  var height = HeavyTreeNode.height(root)
  var count = HeavyTreeNode.count(root) // warning: the heavy tree may have more nodes due to showing dupes
  var ht = new HeavyTreeView({ height, count })
  // map nodes into HeavyNodes, recursively
  HeavyTreeView.toHeavyTreeNode(ht, root, height - 1, count - 1, true)
  return ht
}

module.exports = HeavyTreeView

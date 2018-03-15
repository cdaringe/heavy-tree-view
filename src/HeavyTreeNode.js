class HeavyTreeNode {
  constructor ({ node, x, y }) {
    this.node = node
    this.x = x
    this.y = y
  }
  address () {
    return `${this.x},${this.y}`
  }
  width () {
    return this.node.name.length
  }
}
HeavyTreeNode.count = count
HeavyTreeNode.height = height

function count (node) {
  return 1 + node.dependsOn.reduce((tot, node) => tot + count(node), 0)
}

function height (node) {
  var children = node.dependsOn
  if (children.length === 0) return 1
  var max = Math.max.apply(null, children.map(node => height(node)))
  return 1 + max
}

module.exports = HeavyTreeNode

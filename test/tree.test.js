var ava = require('ava').default
var HeavyTreeView = require('../')
var trees = require('./trees')

ava('case1', async function (t) {
  var res = HeavyTreeView.parseTree(trees.a1).toString()
  t.is(res, 'a1')
})

ava('case2', async function (t) {
  var res = HeavyTreeView.parseTree(trees.a2).toString()
  t.is(res, trees.a2.res)
})

ava('case3', async function (t) {
  var res = HeavyTreeView.parseTree(trees.a3).toString()
  t.is(res, trees.a3.res)
})

ava('case4', async function (t) {
  var res = HeavyTreeView.parseTree(trees.a4).toString()
  t.is(res, trees.a4.res)
})

ava('case5', async function (t) {
  var res = HeavyTreeView.parseTree(trees.a5).toString()
  t.is(res, trees.a5.res)
})

ava('case6', async function (t) {
  var res = HeavyTreeView.parseTree(trees.a6).toString()
  t.is(res, trees.a6.res)
})

ava('case7', async function (t) {
  var res = HeavyTreeView.parseTree(trees.a7).toString()
  t.is(res, trees.a7.res)
})

ava('case8', async function (t) {
  var res = HeavyTreeView.parseTree(trees.a8).toString()
  t.is(res, trees.a8.res)
})

ava('case9', async function (t) {
  var res = HeavyTreeView.parseTree(trees.a9).toString()
  t.is(res, trees.a9.res)
})

ava('caseA', async function (t) {
  var res = HeavyTreeView.parseTree(trees.aA).toString()
  t.is(res, trees.aA.res)
})

ava('caseB', async function (t) {
  var res = HeavyTreeView.parseTree(trees.aB).toString()
  t.is(res, trees.aB.res)
})

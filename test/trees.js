var a1 = {
  // optional `name`, or just uses `a`
  name: 'a1',
  dependsOn: []
}

var b2 = {
  name: 'b2',
  dependsOn: []
}
var a2 = {
  // optional `name`, or just uses `a`
  name: 'a2',
  dependsOn: [b2]
}
a2.res = `
b2──┐
    a2`.trim()

var c3 = {
  name: 'c3',
  dependsOn: []
}
var b3 = {
  name: 'b3',
  dependsOn: [c3]
}
var a3 = {
  name: 'a3',
  dependsOn: [b3]
}
a3.res = `
c3──┐
    b3──┐
        a3`.trim()

var c4 = {
  name: 'c4',
  dependsOn: []
}
var b4 = {
  name: 'b4',
  dependsOn: []
}
var a4 = {
  name: 'a4',
  dependsOn: [b4, c4]
}
a4.res = `
c4──┐
b4--┤
    a4`.trim()



var d5 = {
  name: 'd5',
  dependsOn: []
}
var c5 = {
  name: 'c5',
  dependsOn: [d5]
}
var b5 = {
  name: 'b5',
  dependsOn: []
}
var a5 = {
  name: 'a5',
  dependsOn: [b5, c5]
}
a5.res = `
d5──┐
    c5──┐
b5------┤
        a5`.trim()


var g6 = {
  name: 'g6',
  dependsOn: []
}
var f6 = {
  name: 'f6',
  dependsOn: [g6]
}
var d6 = {
  name: 'd6',
  dependsOn: []
}
var c6 = {
  name: 'c6',
  dependsOn: []
}
var b6 = {
  name: 'b6',
  dependsOn: []
}
var a6 = {
  name: 'a6',
  dependsOn: [b6, c6, d6, f6]
}
a6.res = `
g6──┐
    f6──┐
d6------┤
c6------┤
b6------┤
        a6`
.trim()

var e7 = {
  name: 'e7',
  dependsOn: []
}
var d7 = {
  name: 'd7',
  dependsOn: [e7]
}
var c7 = {
  name: 'c7',
  dependsOn: []
}
var b7 = {
  name: 'b7',
  dependsOn: [c7]
}
var a7 = {
  name: 'a7',
  dependsOn: [b7, d7]
}
a7.res = `
e7──┐
    d7──┐
c7──┐   |
    b7--┤
        a7`
.trim()






var f8 = {
  name: 'f8',
  dependsOn: []
}
var e8 = {
  name: 'e8',
  dependsOn: []
}
var d8 = {
  name: 'd8',
  dependsOn: [e8]
}
var c8 = {
  name: 'c8',
  dependsOn: []
}
var b8 = {
  name: 'b8',
  dependsOn: [c8]
}
var a8 = {
  name: 'a8',
  dependsOn: [b8, d8, f8]
}
a8.res = `
f8----──┐
e8──┐   |
    d8--┤
c8──┐   |
    b8--┤
        a8`
.trim()


module.exports = {
  a1,
  a2,
  a3,
  a4,
  a5,
  a6,
  a7,
  a8
}
// 4 3 2 1 0
// w-|
//   z-|
//     y-|
//       x-|
//     c-| |
//       b-|
//         a

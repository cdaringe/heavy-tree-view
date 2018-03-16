var a1 = {
  name: 'a1',
  children: []
}

var b2 = {
  name: 'b2',
  children: []
}
var a2 = {
  name: 'a2',
  children: [b2]
}
a2.res = `
b2──┐
    a2`.trim()

var c3 = {
  name: 'c3',
  children: []
}
var b3 = {
  name: 'b3',
  children: [c3]
}
var a3 = {
  name: 'a3',
  children: [b3]
}
a3.res = `
c3──┐
    b3──┐
        a3`.trim()

var c4 = {
  name: 'c4',
  children: []
}
var b4 = {
  name: 'b4',
  children: []
}
var a4 = {
  name: 'a4',
  children: [b4, c4]
}
a4.res = `
c4──┐
b4--┤
    a4`.trim()



var d5 = {
  name: 'd5',
  children: []
}
var c5 = {
  name: 'c5',
  children: [d5]
}
var b5 = {
  name: 'b5',
  children: []
}
var a5 = {
  name: 'a5',
  children: [b5, c5]
}
a5.res = `
d5──┐
    c5──┐
b5------┤
        a5`.trim()


var g6 = {
  name: 'g6',
  children: []
}
var f6 = {
  name: 'f6',
  children: [g6]
}
var d6 = {
  name: 'd6',
  children: []
}
var c6 = {
  name: 'c6',
  children: []
}
var b6 = {
  name: 'b6',
  children: []
}
var a6 = {
  name: 'a6',
  children: [b6, c6, d6, f6]
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
  children: []
}
var d7 = {
  name: 'd7',
  children: [e7]
}
var c7 = {
  name: 'c7',
  children: []
}
var b7 = {
  name: 'b7',
  children: [c7]
}
var a7 = {
  name: 'a7',
  children: [b7, d7]
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
  children: []
}
var e8 = {
  name: 'e8',
  children: []
}
var d8 = {
  name: 'd8',
  children: [e8]
}
var c8 = {
  name: 'c8',
  children: []
}
var b8 = {
  name: 'b8',
  children: [c8]
}
var a8 = {
  name: 'a8',
  children: [b8, d8, f8]
}
a8.res = `
f8----──┐
e8──┐   |
    d8--┤
c8──┐   |
    b8--┤
        a8`
.trim()

var g9 = {
  name: 'g9',
  children: []
}
var f9 = {
  name: 'f9',
  children: []
}
var e9 = {
  name: 'e9',
  children: [f9]
}
var d9 = {
  name: 'd9',
  children: [e9, g9]
}
var c9 = {
  name: 'c9',
  children: [d9]
}
var b9 = {
  name: 'b9',
  children: []
}
var a9 = {
  name: 'a9',
  children: [b9, c9]
}
a9.res = `
g9----──┐
f9──┐   |
    e9--┤
        d9──┐
            c9──┐
b9--------------┤
                a9`
.trim()

var cA = {
  name: 'cA',
  children: []
}
var bA = {
  name: 'bA',
  children: [cA]
}
var dA = {
  name: 'dA',
  children: [bA]
}
var aA = {
  name: 'aA',
  children: [bA, dA]
}
aA.res = `
cA──┐
    bA──┐
        dA──┐
cA──┐       |
    bA------┤
            aA
`.trim()

var eB = {
  name: 'eB',
  children: []
}
var dB = {
  name: 'dB',
  children: []
}
var cB = {
  name: 'cB',
  children: [dB]
}
var bB = {
  name: 'bB',
  children: [cB]
}
var aB = {
  name: 'aB',
  children: [bB, eB]
}
aB.res = `
eB--------──┐
dB──┐       |
    cB──┐   |
        bB--┤
            aB
`.trim()

module.exports = {
  a1,
  a2,
  a3,
  a4,
  a5,
  a6,
  a7,
  a8,
  a9,
  aA,
  aB
}

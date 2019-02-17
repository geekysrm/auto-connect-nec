const Graph = require('node-dijkstra');
 
const route = new Graph();

route.addNode('6', {'5': 1});
route.addNode('5', {'4': 1, '6': 1});
route.addNode('4', {'2': 1, '5': 1});
route.addNode('2', {'3': 1, '4': 1, '1': 1});
route.addNode('3', {'9': 1, '2': 1});
route.addNode('9', {'11': 1, '3': 1, '8': 1, '7': 1});
route.addNode('7', {'9': 1, '8': 1});
route.addNode('11', {'9': 1});
route.addNode('8', {'7': 1, '9': 1, '1': 1});
route.addNode('1', {'8': 1, '10': 1, '2': 1});
route.addNode('10', {'1': 1});

module.exports = route;

/**
    * k means algorithm
    * @param data
    * @param k
    * @return {Object}
    */

function kmeans(data, k) {

  var dim = Object.keys(data[0]);
  var randomCentroids = [];
  var keys = d3.keys(data[0]);

  // 1
  for(var i in k) {
    randomCentroids.push(createRandomCentroid(data, dim))
  }

  // 2
  var indexedData = assignToClosestCluster(randomCentroids, data, dim);
}

function createRandomCentroid(data, dim) {
  var randomInt = data[Math.floor(Math.random() * data.length)];
  var randomCentroid = [];
  for (var i in dim.length) {
    randomCentroid.push(Number(randomInt[dim[i]]));
  }
  return randomCentroid;
}

function assignToClosestCluster(randomCentroids, data, dim) {

}
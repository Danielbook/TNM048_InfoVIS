/**
 * k means algorithm
 * @param data
 * @param k
 * @return {Object}
 */

//Returns k-number-of random centroids
function generateCentroid(data, dimensions){

  //Generate random numbers that are within the scale of the data set
  var randNmbr = data[Math.floor(Math.random()*data.length)];
  var cArray = [];

  for(var i = 0; i < dimensions.length; i++){
    cArray.push(Number(randNmbr[dimensions[i]]));
  }
  return cArray;
}

function getClosestCentroid(data, centroids){

  var centroidIndex = [];
  var distArray = [];
  var distance = 0;
  var minDist = 0;

  //Compares the distances of all items with each centroid
  for(var i = 0; i < data.length; i++){
    distArray.push([]);
    for(var j = 0; j < centroids.length; j++){ //Math.pow(data[i][j] - centroids[j][j]...
      distance = Math.sqrt(Math.pow(data[i].A - centroids[j][0], 2) +
        Math.pow(data[i].B - centroids[j][1], 2) +
        Math.pow(data[i].C - centroids[j][2], 2));
      distArray[i].push(distance); //Push all distances between every items and every centroid into an array...
      //console.log(i + ": " + distance);
    }
    minDist = d3.min(distArray[i]);
    //console.log(i + ": " + "idx of minDist: " + distArray[i].indexOf(minDist));
    centroidIndex.push(distArray[i].indexOf(minDist));
  }
  console.log(distArray[0]);
  return centroidIndex;   //Returns an array with indexes of the closes centroid for each item in the data-array
}

function kmeans(data, k) {

  //Get data-dimensions
  var dimensions = Object.keys(data[0]);
  var centroids = [];

  //1. Randomly place K points into the space
  for(var i = 0; i<k; i++){
    centroids.push(generateCentroid(data, dimensions));
  }

  //2. Assign each item to the cluster that has the closest centroid. Euclidian distance.
  var index = getClosestCentroid(data, centroids);   //Returns the index of the closest centroid
  //console.log(index);


  //3. Recalculate centroids positions to be in the center of the cluster. Average values in all dimensions
  //4. Check quality of cluster.  Sum of the squared distances within each cluster
};
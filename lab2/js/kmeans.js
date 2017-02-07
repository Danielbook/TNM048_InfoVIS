/**
 * k means algorithm
 * @param data
 * @param k
 * @return {Object}
 */

//Returns k-number-of random centroids
function generateCentroid(data, k){
  var arr = [];

  for(var i = 0; i < k; i++){
    arr[i] = data[Math.floor(Math.random()*data.length)];
  }
  return arr;
}

function getClosestCentroid(point, centroids, keys){
  var shortestDist = Infinity;
  var assignedCluster;
  //console.log(centroids.length);

  for (var j = 0; j < centroids.length; j++) {
    var sum = 0;
    keys.forEach(function(dimension){
      var p = Number(point[dimension]);
      var q = Number(centroids[j][dimension]);

      sum += Math.pow(q-p, 2);
    });

    sum = Math.sqrt(sum);

    if(sum < shortestDist){
      shortestDist = sum;
      assignedCluster = j;
    }
  }

  return assignedCluster;
  // var centroidIndex = [];
  // var distArray = [];
  // var distance = 0;
  // var minDist = 0;
  //
  // //Compares the distances of all items with each centroid
  // for(var i = 0; i < data.length; i++){
  //   distArray.push([]);
  //   for(var j = 0; j < centroids.length; j++){ //Math.pow(data[i][j] - centroids[j][j]...
  //     distance = Math.sqrt(Math.pow(data[i][centroids] - centroids[j][0], 2) +
  //       Math.pow(data[i][centroids] - centroids[j][1], 2) +
  //       Math.pow(data[i][centroids] - centroids[j][2], 2));
  //     distArray[i].push(distance); //Push all distances between every items and every centroid into an array...
  //     //console.log(i + ": " + distance);
  //   }
  //   minDist = d3.min(distArray[i]);
  //   //console.log(i + ": " + "idx of minDist: " + distArray[i].indexOf(minDist));
  //   centroidIndex.push(distArray[i].indexOf(minDist));
  // }
  // console.log(distArray[0]);
  // return centroidIndex;   //Returns an array with indexes of the closes centroid for each item in the data-array
}

function checkQuality(data, keys, centroids, cluster_array){
  var sumMin = 0;
  var minError = 0;

  for(var i = 0; i < centroids.length; i++) {
    minError = 0;
    for(var j = 0; j < data.length; j++) {
      if(cluster_array[j] == i)
        keys.forEach(function(dimension){
          var x = Number(data[j][dimension]);
          var y = Number(centroids[i][dimension]);
          minError = Math.pow((x-y), 2);
        });
      sumMin += minError;
    }
  }
  console.log("Sum min: " + sumMin);
  return sumMin;
}

function kmeans(data, k) {
  //Get data-dimensions
  var dimensions = Object.keys(data[0]);
  var centroids = [];
  var cluster_array = [];
  var quality;
  var oldQuality = 0;
  var qualityDiff = 0;
  var n = 0;
  var self = this;

  do {
    //1. Randomly place K points into the space
    centroids = generateCentroid(data, k);

    //2. Assign each item to the cluster that has the closest centroid. Euclidian distance.
    data.forEach(function(d, i){
      cluster_array[i] = getClosestCentroid(d, centroids, dimensions);
    });

    // cluster_array = getClosestCentroid(data, centroids);   //Returns the index of the closest centroid
    //console.log(index);

    //3. Recalculate centroids positions to be in the center of the cluster. Average values in all dimensions

    //4. Check quality of cluster.  Sum of the squared distances within each cluster
    quality = checkQuality(data, dimensions, centroids, cluster_array);
    qualityDiff = Math.abs(oldQuality - quality);
    oldQuality = quality;
    n++;
    console.log("Quality: ", qualityDiff);

  } while(qualityDiff > 0);
  return cluster_array;
}
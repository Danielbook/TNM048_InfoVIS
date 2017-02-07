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
}

function recalcCentroid(data, cluster_array, centroids, keys){
  var temp = [];

  for (var i = 0; i < centroids.length; i++) {
    var count = 0;
    var point = {};

    keys.forEach(function(dimension){
      var avg = 0;

      for (var j = 0; j < data.length; j++) {
        if(cluster_array[j] == i){

          avg+= Number(data[j][dimension]);
          count++;
        }
      }

      point[dimension] = avg/count;

    });
    temp.push(point);
  }
  return temp;
}

function recalculateCentroid(data, index, centroids){
  var avgDistToCentroid = []; //Sum of all distances to centroids within each cluster
  var nrOfDistInClusters = [];  //Basically what value to divide the sum of all distances for each cluster

  //Initialize as 0 for k nr of centroids.
  for(var i in centroids){
    nrOfDistInClusters.push(0);
    avgDistToCentroid.push([]);

    for(var j in centroids[0]) {
      avgDistToCentroid[i].push(0);
    }
  }

  //Sums the distances into the slot pertaining to the correct cluster in index
  var tempIndex;
  for(var i = 0; i < index.length; i++){
    tempIndex = index[i]; //This is the index of the nearest centroid for data-objects

    avgDistToCentroid[tempIndex][0] += Math.sqrt(Math.pow(Number(data[i].A) - Number(centroids[tempIndex].A), 2));
    avgDistToCentroid[tempIndex][1] += Math.sqrt(Math.pow(Number(data[i].B) - Number(centroids[tempIndex].B), 2));
    avgDistToCentroid[tempIndex][2] += Math.sqrt(Math.pow(Number(data[i].C) - Number(centroids[tempIndex].C), 2));

    nrOfDistInClusters[index[i]] = (nrOfDistInClusters[index[i]] + 1);
  }

  //Divides sum of distances to centroids within each cluster by the nr of distances
  for(var i = 0; i < avgDistToCentroid.length; i++){
    for(var j = 0; j < centroids[0].length; j++) {
      avgDistToCentroid[i][j] = (avgDistToCentroid[i][j] / nrOfDistInClusters[i]);
    }
  }
  //console.log(avgDistToCentroid);
  //console.log(nrOfDistInClusters);

  return avgDistToCentroid; // Returns the average distances from each centroid in each cluster
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
  var avgDistFromCentroid = [];

  do {
    //1. Randomly place K points into the space
    centroids = generateCentroid(data, k);

    //2. Assign each item to the cluster that has the closest centroid. Euclidian distance.
    data.forEach(function(d, i){
      cluster_array[i] = getClosestCentroid(d, centroids, dimensions);
    });

    //3. Recalculate centroids positions to be in the center of the cluster. Average values in all dimensions
    avgDistFromCentroid = recalcCentroid(data, cluster_array, centroids, dimensions);


    //4. Check quality of cluster.  Sum of the squared distances within each cluster
    quality = checkQuality(data, dimensions, avgDistFromCentroid, cluster_array);
    qualityDiff = Math.abs(oldQuality - quality);
    oldQuality = quality;
    n++;
    console.log("Quality: ", qualityDiff);

  } while(qualityDiff > 0.1);
  return cluster_array;
}

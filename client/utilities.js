/*
Function Name: clamp(val, min, max)
Author: Web - various sources
Return Value: the constrained value
Description: returns a value that is
constrained between min and max (inclusive) 
*/
function clamp(val, min, max){
	return Math.max(min, Math.min(max, val));
}

//Distance formula
function distance(vectorA, vectorB) {
    return Math.sqrt(Math.pow(vectorB.x - vectorA.x, 2) + Math.pow(vectorB.y - vectorA.y, 2));
}
//Simple bounding box aka AABB collision
function aabb(vectorA, vectorB){
    //console.dir(vectorA);
    //console.dir(vectorB);
    if (  vectorA.x + (vectorA.size * 2) < vectorB.x   || vectorA.x > vectorB.x + (vectorB.size * 2) ) {
        return false;
    }
    else if (vectorA.y > vectorB.y + (vectorB.size * 2) || vectorA.y + (vectorA.size * 2) < vectorB.y ) {
        return false;
    } 
    return true;
}
function getRandom(min, max) {
  	return Math.random() * (max - min) + min;
}
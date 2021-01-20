//all functions for faceted search go here
var facetedSearchObj = {};
//matchFilter is the function that compares two terms and returns a match if the score is above a threshold
facetedSearchObj.matchFilter = function (allItems, query, threshold) {
   // Create an array of properties that are defined in the query.
   // For the example, it will be [food_type, neighborhood]
   const properties = Object.keys(query)
   .filter(key => query[key].trim().length > 0);
   // Create a comparison string for the query item.
   // For the example, it will be “Mxicanmarketsquare”
   const queryComp = properties.map(p => query[p]).join();
   // Filter down to get the matching items.
   const matchingItems = allItems.filter((item) => {
     // Create a comparison string for the current
     // item that consists of the property values
     // that are included in the query.
     const itemComp = properties.map(p => item[p]).join();
     // Compare itemComp string to the queryComp.
     // Statement evaluates to true, then the item matches!
     return itemComp.score(queryComp) >= threshold;
	 
   });
 	return matchingItems;
}


//search for type
facetedSearchObj.arrayOrSingleFilterType = function (terms, placesToSearchThrough, threshold, matchingPlaces) {
	if (Array.isArray(terms) === true) {
		var arrayOfSearchTerms = terms;
		
		for (i = 0; i < arrayOfSearchTerms.length; i++) {
			const filterQuery = { type : arrayOfSearchTerms[i] };
			var matches = facetedSearchObj.matchFilter(placesToSearchThrough,filterQuery, threshold);
			for (j = 0; j < matches.length; j++) {
				matchingPlaces.push(matches[j]);
				}
			}
		} else {
		const filterQuery = { type : terms };
		var matches = facetedSearchObj.matchFilter(placesToSearchThrough,filterQuery, threshold);
		for (j = 0; j < matches.length; j++) {
			matchingPlaces.push(matches[j]);
			}
		}
	}
//search for mrtLine
facetedSearchObj.arrayOrSingleFilterLine = function (terms, placesToSearchThrough, threshold, matchingPlaces) {
	if (Array.isArray(terms) === true) {
		var arrayOfSearchTerms = terms;
		
		for (i = 0; i < arrayOfSearchTerms.length; i++) {
			const filterQuery = { mrtLine : arrayOfSearchTerms[i] };
			var matches = facetedSearchObj.matchFilter(placesToSearchThrough,filterQuery, threshold);
			for (j = 0; j < matches.length; j++) {
				matchingPlaces.push(matches[j]);
				}
			}
		} else {
		const filterQuery = { mrtLine : terms };
		var matches = facetedSearchObj.matchFilter(placesToSearchThrough,filterQuery, threshold);
		for (j = 0; j < matches.length; j++) {
			matchingPlaces.push(matches[j]);
			}
		}
	}
//search for mrt Station
facetedSearchObj.arrayOrSingleFilterStations = function (terms, placesToSearchThrough, threshold, matchingPlaces) {
	if (Array.isArray(terms) === true) {
		var arrayOfSearchTerms = terms;
		
		for (i = 0; i < arrayOfSearchTerms.length; i++) {
			const filterQuery = { mrtStation : arrayOfSearchTerms[i] };
			var matches = facetedSearchObj.matchFilter(placesToSearchThrough,filterQuery, threshold);
			for (j = 0; j < matches.length; j++) {
				matchingPlaces.push(matches[j]);
				}
			}
		} else {
		const filterQuery = { mrtStation : terms };
		var matches = facetedSearchObj.matchFilter(placesToSearchThrough,filterQuery, threshold);
		for (j = 0; j < matches.length; j++) {
			matchingPlaces.push(matches[j]);
			}
		}
	}









module.exports = facetedSearchObj;
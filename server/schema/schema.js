const graphql = require('graphql');
let _ = require('lodash');


//dummy data
let usersData = [
	{id: '1', first_name: 'Andy', username: 'andy_from_karm', email: 'andrea@karm.co'},
	{id: '2', first_name: 'Ryan', username: 'ryan_from_karm', email: 'ryan@karm.co'},
	{id: '3', first_name: 'Heather', username: 'heather_loves_dogs', email: 'heather@fakemail.com'},
	{id: '4', first_name: 'Ron', username: 'ronald_the_dad', email: 'ronald@fakemail.com'},
	{id: '5', first_name: 'Jonna', username: 'jonna_the_momma', email: 'jonna@fakemail.com'}
]
let businessesData = [
	{id: '1', name: 'Aldi', category: 'grocery'},
	{id: '2', name: 'Ground Control', category: 'restaurant'},
	{id: '3', name: 'Casa Yari', category: 'restaurant'},
	{id: '4', name: 'Tony\'s', category: 'grocery'},
	{id: '5', name: 'Vishu', category: 'convenience'}
]
let ratingsData = [
	{id: '1', category: 'health'},
	{id: '2', category: 'clean'},
	{id: '3', category: 'distance'},
	{id: '4', category: 'contactless'}
]


//destructuring graphql.datatypes
const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLSchema
} = graphql


//create types
const UserType = new GraphQLObjectType({
	name: 'User',
	description: 'Karm site users',
	fields: () => ({
		id: {type: GraphQLID}, //would usually be GraphQLID; using GraphQLString here for simplicity's sake
		first_name: {type: GraphQLString},
		username: {type: GraphQLString},
		email: {type: GraphQLString}
	})
})
const BusinessType = new GraphQLObjectType({
	name: 'Business',
	description: 'open businesses',
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		category: {type: GraphQLString}
	})
})
const RatingType = new GraphQLObjectType({
	name: 'Rating',
	description: 'ratings categories',
	fields: () => ({
		id: {type: GraphQLID},
		category: {type: GraphQLString}
	})
})


//create root query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'description',
	fields: {
		user: {
			type: UserType, //references UserType above
			args: {id: {type: GraphQLID}},

			resolve(parent, args) {
				//get and return data from source here
				return _.find(usersData, {id: args.id})
			}
		},
		business: {
			type: BusinessType,
			args: {id: {type: GraphQLID}},
			
			resolve(parent, args) {
				return _.find(businessesData, {id: args.id})
			}
		},
		rating: {
			type: RatingType,
			args: {id: {type: GraphQLID}},

			resolve(parent, args) {
				return _.find(ratingsData, {id: args.id})
			}
		}
	}
})


module.exports = new GraphQLSchema({
	query: RootQuery
})
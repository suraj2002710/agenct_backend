const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
type Caregiver{
    _id: ID!,
    agency: ID!,
    agencyEmployeeId: String!,
    firstName: String!,
    lastName: String!,
    createdAt:String!
}

type Query{
    getallCaregiver:[Caregiver]!
}

input CaregiverInput{
    punch:String!,
    
}

type Mutation{
    createCaregiver(Caregiver:CaregiverInput):Caregiver!
}

`

module.exports = typeDefs
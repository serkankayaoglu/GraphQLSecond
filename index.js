const { ApolloServer, gql } = require('apollo-server');
const { events, locations, users, participants } = require('./data');
var uniqid = require('uniqid');

const typeDefs = gql`
    #User
    type User {
        id: ID!
        username: String!
        email: String!
    }

    input CreateUserInput {
        username: String!
        email: String!
    }

    input UpdateUserInput {
        username: String
        email: String
    }

    #Event
    type Event {
        id: ID!
        title: String!
        description: String!
        date: String!
        from: String!
        to: String!
        location_id: ID!
        user_id: ID!
    }

    input CreateEventInput {
        title: String!
        description: String!
        date: String!
        from: String!
        to: String!
        location_id: ID!
        user_id: ID!
    }

    input UpdateEventInput {
        title: String
        description: String
        date: String
        from: String
        to: String
        location_id: ID
        user_id: ID
    }

    #Locations
    type Location {
        id: ID!
        name: String!
        desc: String!
        lat: String!
        lng: String!
    }

    input CreateLocationInput {
        name: String!
        desc: String!
        lat: String!
        lng: String!
    }

    input UpdateLocationInput {
        name: String
        desc: String
        lat: String
        lng: String
    }

    #Participants
    type Participant {
        id: ID!
        event_id: ID!
        user_id: ID!
    }

    input CreateParticipantInput {
        event_id: ID!
        user_id: ID!
    }

    input UpdateParticipantInput {
        event_id: ID
        user_id: ID
    }

    #DeleteAll Count
    type DeleteAll{
        count: Int!
    }

    #Query
    type Query {
        users: [User!]!
        user(id: ID!): User!
        events: [Event!]!
        event(id: ID!): Event!
        locations: [Location!]!
        location(id: ID!): Location!
        participants: [Participant!]!
        participant(id: ID!): Participant!
    }

    type Mutation {
        #User
        createUser(data: CreateUserInput!): User!
        updateUser(id: ID!, data: UpdateUserInput!): User!
        deleteUser(id: ID!): User!
        deleteAllUsers: DeleteAll!
        #Event
        createEvent(data: CreateEventInput!): Event!
        updateEvent(id: ID!, data: UpdateEventInput!): Event!
        deleteEvent(id: ID!): Event!
        deleteAllEvents: DeleteAll!
        #Location
        createLocation(data: CreateLocationInput!): Location!
        updateLocation(id: ID!, data: UpdateLocationInput!): Location!
        deleteLocation(id: ID!): Location!
        deleteAllLocations: DeleteAll!
        #Participant
        createParticipant(data: CreateParticipantInput!): Participant!
        updateParticipant(id: ID!, data: UpdateParticipantInput!): Participant!
        deleteParticipant(id: ID!): Participant!
        deleteAllParticipants: DeleteAll!
    }
`;

const resolvers = {
    Query: {
        users: () => users,
        user: (parent, args) => users.find(user => user.id == args.id),
        events: () => events,
        event: (parent, args) => events.find(event => event.id == args.id),
        locations: () => locations,
        location: (parent, args) => locations.find(location => location.id == args.id),
        participants: () => participants,
        participant: (parent, args) => participants.find(participant => participant.id == args.id)
    },
    Mutation: {
        createUser: ( parent, { data } ) => {
            const newUser = {
                id: uniqid(),
                ...data
            }
            users.push(newUser);
            return newUser;
        },
        updateUser: ( parent, { id, data } ) => {
            const user_index = users.findIndex(user => user.id == id);
            if (user_index == -1) {
                throw new Error('User not found');
            }
            const updated_user = users[user_index] = {
                ...users[user_index],
                ...data
            }
            return updated_user;
        },
        deleteUser: ( parent, { id } ) => {
            const user_index = users.findIndex(user => user.id == id);
            if (user_index == -1) {
                throw new Error('User not found');
            }
            const deleted_user = users[user_index];
            users.splice(user_index, 1);
            return deleted_user;

        },
        deleteAllUsers: () => {
            const count = users.length;
            users.splice(0, users.length);
            return { count };
        },
        createEvent: ( parent, { data } ) => {
            const newEvent = {
                id: uniqid(),
                ...data
            }
            events.push(newEvent);
            return newEvent;
        },
        updateEvent: ( parent, { id, data } ) => {
            const event_index = events.findIndex(event => event.id == id);
            if (event_index == -1) {
                throw new Error('Event not found');
            }
            const updated_event = events[event_index] = {
                ...events[event_index],
                ...data
            }
            return updated_event;
        },
        deleteEvent: ( parent, { id } ) => {
            const event_index = events.findIndex(event => event.id == id);
            if (event_index == -1) {
                throw new Error('Event not found');
            }
            const deleted_event = events[event_index];
            events.splice(event_index, 1);
            return deleted_event;
        },
        deleteAllEvents: () => {
            const count = events.length;
            events.splice(0, events.length);
            return { count };
        },
        createLocation: ( parent, { data } ) => {
            const newLocation = {
                id: uniqid(),
                ...data
            }
            locations.push(newLocation);
            return newLocation;
        },
        updateLocation: ( parent, { id, data } ) => {
            const location_index = locations.findIndex(location => location.id == id);
            if (location_index == -1) {
                throw new Error('Location not found');
            }
            const updated_location = locations[location_index] = {
                ...locations[location_index],
                ...data
            }
            return updated_location;
        },
        deleteLocation: ( parent, { id } ) => {
            const location_index = locations.findIndex(location => location.id == id);
            if (location_index == -1) {
                throw new Error('Location not found');
            }
            const deleted_location = locations[location_index];
            locations.splice(location_index, 1);
            return deleted_location;
        },
        deleteAllLocations: () => {
            const count = locations.length;
            locations.splice(0, locations.length);
            return { count };
        },
        createParticipant: ( parent, { data } ) => {
            const newParticipant = {
                id: uniqid(),
                ...data
            }
            participants.push(newParticipant);
            return newParticipant;
        },
        updateParticipant: ( parent, { id, data } ) => {
            const participant_index = participants.findIndex(participant => participant.id == id);
            if (participant_index == -1) {
                throw new Error('Participant not found');
            }
            const updated_participant = participants[participant_index] = {
                ...participants[participant_index],
                ...data
            }
            return updated_participant;
        },
        deleteParticipant: ( parent, { id } ) => {
            const participant_index = participants.findIndex(participant => participant.id == id);
            if (participant_index == -1) {
                throw new Error('Participant not found');
            }
            const deleted_participant = participants[participant_index];
            participants.splice(participant_index, 1);
            return deleted_participant;
        },
        deleteAllParticipants: () => {
            const count = participants.length;
            participants.splice(0, participants.length);
            return { count };
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
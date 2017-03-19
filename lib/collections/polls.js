Polls = new Mongo.Collection('polls');

Meteor.methods({
    pollInsert: function(pollAttributes){
        check(this.userId, String);
        check(pollAttributes, {
            title: String,
            options: Array,
            author: String,
            created: Date
        });

        var user = Meteor.user();
        var poll = _.extend(pollAttributes,{
            userId: user._id,
        });

        var pollId = Polls.insert(poll);

    }
});
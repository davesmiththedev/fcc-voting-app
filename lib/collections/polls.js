Polls = new Mongo.Collection('polls');

Meteor.methods({
    pollInsert: function(pollAttributes){
        check(this.userId, String);
        check(pollAttributes, {
            title: String,
            options: Array
        });

        var user = Meteor.user();
        var poll = _.extend(pollAttributes,{
            userId: user._id,
            author: user.username,
            created: new Date()
        });

        var pollId = Polls.insert(poll);

    }
});
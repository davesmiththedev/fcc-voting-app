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

    },
    pollDelete: function(poll_id) {
        check(this.userId, String);
        check(poll_id, String);

        varPollId = Polls.remove({_id: poll_id});
    },
    pollEditTitle: function(pollAttributes){
        check(this.userId, String);
        check(pollAttributes, {
            _id: String,
            title: String
        });

        Polls.update(
            {_id: pollAttributes._id},
            {$set:
                {title: pollAttributes.title}
            },
            {upsert: true}
        );

    },
    pollEditOptionName: function(pollAttributes){
        check(this.userId, String);
        check(pollAttributes, {
            _id: String,
            oldName: String,
            newName: String
        });

        Polls.update(
            {_id: pollAttributes._id, "options.name": oldName },
            {$set:{
                'options.$':{
                        name: newName
                    }
                }
            },
            {upsert: true}
        );
    },

    voteAdd: function(ballot) {
        check(ballot, {
            _id: String,
            option: String
        });

        var pollId = Polls.update(
            {_id: ballot._id, "options.name": ballot.option },
            {
                $inc: {"options.$.votes": +1}
            }
        );
    }
});
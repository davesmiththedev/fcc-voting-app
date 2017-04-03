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
    pollDeleteOption: function(pollAttributes){
        check(pollAttributes, {
            _id: String,
            name: String
        });

        let pollId = Polls.update(
            {_id: pollAttributes._id, "options.name": pollAttributes.name},
            {$pull: {"options": {"name": pollAttributes.name}}}
        );
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
            {_id: pollAttributes._id, "options.name": pollAttributes.oldName },
            {$set:{
                'options.$.name': pollAttributes.newName
                }
            },
            {upsert: true}
        );
    },
    pollAddOption: (newOption)=>{
        // check(this.userId, String);
        check(newOption, {
            _id: String,
            name: String
        });
        
        let user = Meteor.user();

        Polls.update(
            {_id: newOption._id},
            {$push:{
                options: {
                    name: newOption.name,
                    votes: 0,
                    author: user.username,
                    created: new Date()
                }
            }}
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
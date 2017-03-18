Template.pollsList.helpers({
    polls: function(){
        return Polls.find({}, {sort: {created: -1}});
    }
});
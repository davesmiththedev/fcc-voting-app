Template.pollsList.helpers({
    polls: function(){
        return Polls.find();
    }
});
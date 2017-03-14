Template.pollNew.events({
    'submit form': function(e){

        var poll = {
            title: $(e.target).find('[name=title]').val()
        };

        Meteor.call('pollInsert', poll, function(error, result){
            if(error){
                return alert(error.reason);
            };
        });
        Router.go('pollsList')
    }
});
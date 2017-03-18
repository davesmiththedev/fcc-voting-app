Template.pollNew.events({
    'submit form': function(e){
        e.preventDefault();

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
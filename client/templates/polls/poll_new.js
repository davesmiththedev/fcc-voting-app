Template.pollNew.events({
    'submit form': function(e){
        e.preventDefault();

        var user = Meteor.user();
        
        var optionsFromForm = document.getElementsByClassName("options");
        var optionsList = [];

        [].forEach.call(optionsFromForm, (optionItem)=>{
            optionsList.push({
                name: optionItem.value, 
                votes: 0,
                author: user.username,
                created: new Date()
            });
        });

        var poll = {
            title: $(e.target).find('[name=title]').val(),
            options: optionsList,
            author: user.username,
            created: new Date()
        };

        Meteor.call('pollInsert', poll, function(error, result){
            if(error){
                return alert(error.reason);
            };
        });

        Router.go('pollsList')
    }
});
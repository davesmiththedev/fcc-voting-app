Template.pollNew.events({
    'submit form': function(e){
        e.preventDefault();

        var optionsList = [];
        var optionsFromForm = document.getElementsByClassName("options");

        [].forEach.call(optionsFromForm, (optionItem)=>{
            optionsList.push({name: optionItem.value, votes: 0});
        });

        var poll = {
            title: $(e.target).find('[name=title]').val(),
            options: optionsList
        };

        Meteor.call('pollInsert', poll, function(error, result){
            if(error){
                return alert(error.reason);
            };
        });

        Router.go('pollsList')
    }
});
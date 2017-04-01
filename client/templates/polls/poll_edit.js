$(function()
{
    $(document).on('click', '.btn-add', function(e)
    {
        e.preventDefault();

        var controlForm = $('#options'),
            currentEntry = $(this).parents('.entry:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

        newEntry.find('input').val('');
        controlForm.find('.entry:not(:last) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<span class="glyphicon glyphicon-minus"></span>');
    })
});


Template.pollEdit.events({
    'click .btn-remove': function(e)
    {
		$(this).parents('.entry:first').remove();

		e.preventDefault();
		return false;
	},
    
    'submit form': function(e){
        e.preventDefault();

        var user = Meteor.user();

        console.log("Submit");
        
        // var pollOptions = document.getElementsByClassName("options");
        // var optionsList = [];

        // [].forEach.call(pollOptions, (optionItem)=>{
        //     optionsList.push({
        //         name: optionItem.value, 
        //         votes: 0,
        //         author: user.username,
        //         created: new Date()
        //     });
        // });

        var pollUpdates = {
            _id: this._id,
            title: $(e.target).find('[name=title]').val(),
            // options: optionsList,
        };

        Meteor.call('pollEdit', pollUpdates, function(error, result){
            if(error){
                return alert(error.reason);
            };
        });

        Router.go('pollDashboard', {_id: this._id})
    }
});


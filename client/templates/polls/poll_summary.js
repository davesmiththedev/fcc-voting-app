$(function()
{
    $(document).on('click', '.btn-vote', function(e)
    {
        e.preventDefault();

        var urlParts = location.href.split('/');
        var id = urlParts.pop();

        var optionNumber = this.id.substr(this.id.length -1);

        var ballot = {
            _id: id,
            option: $('#option' + optionNumber).html()
        }

        Meteor.call('voteAdd', ballot, function(error, result){
            if(error){
                return alert(error.reason);
            };
            $('.btn-vote').attr('disabled', true);
        });
    });

    $(document).on('click', '.btn-delete', function(e)
    {
        e.preventDefault();

        var urlParts = location.href.split('/');
        var id = urlParts.pop();

        Meteor.call('pollDelete', id, function(error, result){
            if(error){
                return alert(error.reason);
            };
            Router.go('pollsList');
        });
    });
});
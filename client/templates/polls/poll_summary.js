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
        });
    });
});
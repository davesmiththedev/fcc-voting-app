$(function()
{
    $(document).on('click', '.btn-vote', function(e)
    {
        e.preventDefault();

        var ballot = {
            _id: "XRqXNfW4HMssECGqA",
            option: "Windows"
        }

        Meteor.call('voteAdd', ballot, function(error, result){
            if(error){
                return alert(error.reason);
            };
        });
    });
});
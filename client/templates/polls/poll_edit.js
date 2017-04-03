import { Session } from 'meteor/session'

//Set id for global temaplte use
let urlParts = location.href.split('/');
Session.set({
    id: urlParts.pop()
});

Template.pollEdit.events({
    'change #title': function(e){
        e.preventDefault();

        var pollUpdates = {
            _id: Session.get('id'),
            title: $(e.target).val(),
        };

        Meteor.call('pollEditTitle', pollUpdates, function(error, result){
            if(error){
                return alert(error.reason);
            };
        });

        return false;
    },

    'focus .options': function(e){
        e.preventDefault();
        Session.set({
            oldName: $(e.target).val()
        });
    },

    'change .options': function(e){
        e.preventDefault();
        
        let pollOption = {
            _id: Session.get('id'),
            oldName: Session.get('oldName'),
            newName: $(e.target).val()
        }

        Meteor.call('pollEditOptionName', pollOption, function(error, result){
            if(error){
                return alert(error.reason);
            };
        });

        return false;

    },

    'change .newOption': (e)=>{
        e.preventDefault();
        
        let newOption = {
            _id: Session.get('id'),
            name: $(e.target).val()
        };
        //commit to database
        Meteor.call('pollAddOption', newOption, (error, result)=>{
            if(error){
                return alert(error.reason)
            }else{
                $(e.target).closest("input").val('');
            }
        });
        
        return false;

    },
    
    'click .btn-remove': function(e){
		e.preventDefault();

        let name = $(e.target).closest('.entry').find('.options').val();

        let pollOption = {
            _id: Session.get('id'),
            name: name
        };

        Meteor.call('pollDeleteOption', pollOption, function(error, result){
            if(error){
                return alert(error.reason);
            }
        });
        return false;
	},
    
    'submit form': function(e){
        e.preventDefault();

        Router.go('pollDashboard', {_id: this._id})
    }
});


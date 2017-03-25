Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', {name: 'pollsList'});

Router.route('/polls/:_id', {
    name: 'pollDashboard',
    data: function(){ return Polls.findOne(this.params._id); }
})

Router.route('/create', { name: 'pollNew'});
Router.configure({
    layoutTemplate: 'layout'
});

Router.route('/', {name: 'pollsList'});

Router.route('/create', { name: 'pollNew'});
var pollsData = [
    {
        title: 'Cats or Dogs',
        author: 'Dave'
    },
    {
        title: 'Favorite Burger',
        author: 'Dave'
    },
    {
        title: 'Android or iOS',
        author: 'Dave'
    }
];

Template.pollsList.helpers({
    polls: pollsData
});
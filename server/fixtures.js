if(Polls.find().count() === 0){
    Polls.insert({
        title: 'Dogs or Cats',
        author: 'Dave',
        created: new Date()
    });
    Polls.insert({
        title: 'Favorite Burger',
        author: 'Dave',
        created: new Date()
    });
    Polls.insert({
        title: 'Android or iOS?',
        author: 'Dave',
        created: new Date()
    });
}